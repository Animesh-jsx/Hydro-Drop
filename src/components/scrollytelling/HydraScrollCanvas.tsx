import { useEffect, useRef, useCallback } from "react";
import { useMotionValueEvent } from "framer-motion";
import type { MotionValue } from "framer-motion";

interface Props {
  scrollYProgress: MotionValue<number>;
  totalFrames: number;
}

// ─── Procedural frame renderer ──────────────────────────────────────────────
// Simulates a 200-frame "water splash → premium bottle" transformation
// entirely by canvas drawing, so no image assets are required.

function lerpColor(a: string, b: string, t: number): string {
  const parse = (c: string) => {
    const r = parseInt(c.slice(1, 3), 16);
    const g = parseInt(c.slice(3, 5), 16);
    const bl = parseInt(c.slice(5, 7), 16);
    return [r, g, bl];
  };
  const [ar, ag, ab] = parse(a);
  const [br, bg, bb] = parse(b);
  const ri = Math.round(ar + (br - ar) * t);
  const gi = Math.round(ag + (bg - ag) * t);
  const bi = Math.round(ab + (bb - ab) * t);
  return `rgb(${ri},${gi},${bi})`;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  progress: number,
) {
  const p = Math.max(0, Math.min(1, progress));
  const ep = easeInOutCubic(p);

  // ── Background ──────────────────────────────────────────────────────────
  // Dark misty forest green → bright soft studio white
  const bgDark = "#011a15";
  const bgMid = "#032d22";
  const bgLight = "#e8f5f0";
  const bgStudio = "#f0faf6";

  let bgColor: string;
  if (p < 0.5) {
    bgColor = lerpColor(bgDark, bgMid, p * 2);
  } else {
    bgColor = lerpColor(bgMid, p < 0.85 ? bgLight : bgStudio, (p - 0.5) * 2);
  }

  const bgGrad = ctx.createRadialGradient(
    w * 0.5,
    h * 0.4,
    0,
    w * 0.5,
    h * 0.4,
    w * 0.85,
  );
  bgGrad.addColorStop(0, bgColor);
  bgGrad.addColorStop(
    1,
    p < 0.5 ? "#000d09" : lerpColor("#020f0a", "#c8ece0", (p - 0.5) * 2),
  );
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, w, h);

  // ── Ambient mist / light rays ───────────────────────────────────────────
  if (p > 0.15) {
    const rayAlpha = Math.min(1, (p - 0.15) / 0.3) * 0.18;
    ctx.save();
    ctx.globalAlpha = rayAlpha;
    for (let i = 0; i < 5; i++) {
      const rx = w * (0.25 + i * 0.12);
      const rg = ctx.createLinearGradient(rx - 30, 0, rx + 30, h * 0.7);
      rg.addColorStop(0, "rgba(255,255,255,0.0)");
      rg.addColorStop(0.3, "rgba(180,255,220,0.6)");
      rg.addColorStop(1, "rgba(255,255,255,0.0)");
      ctx.fillStyle = rg;
      ctx.beginPath();
      ctx.moveTo(rx - 40, 0);
      ctx.lineTo(rx + 40, 0);
      ctx.lineTo(rx + 10, h * 0.75);
      ctx.lineTo(rx - 10, h * 0.75);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  // ── Water splash system ─────────────────────────────────────────────────
  const splashIntensity =
    p < 0.6 ? 1 - easeInOutCubic(Math.min(1, p / 0.6)) : 0;
  if (splashIntensity > 0.01) {
    ctx.save();
    ctx.globalAlpha = splashIntensity;

    const cx = w * 0.5;
    const cy = h * 0.55;

    // Main splash body
    const splashGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, h * 0.35);
    splashGrad.addColorStop(0, "rgba(16,185,129,0.9)");
    splashGrad.addColorStop(0.4, "rgba(4,120,87,0.6)");
    splashGrad.addColorStop(1, "rgba(2,44,34,0.0)");
    ctx.fillStyle = splashGrad;

    // Draw organic splash shape
    const time = p * Math.PI * 4; // drive shape animation by progress
    ctx.beginPath();
    const arms = 7;
    for (let a = 0; a <= Math.PI * 2; a += 0.04) {
      const arm = Math.sin(a * arms + time) * 0.22;
      const r = h * (0.2 + arm * splashIntensity);
      const x = cx + Math.cos(a) * r * 0.55;
      const y = cy + Math.sin(a) * r;
      a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();

    // Water droplets radiating outwards
    for (let d = 0; d < 12; d++) {
      const angle = (d / 12) * Math.PI * 2 + p * 3;
      const dist = h * (0.22 + Math.sin(p * 8 + d) * 0.08) * splashIntensity;
      const dx = cx + Math.cos(angle) * dist * 0.7;
      const dy = cy + Math.sin(angle) * dist * 0.5 - h * 0.08 * p;
      const dr = 3 + Math.sin(d * 1.5) * 2;
      const dropGrad = ctx.createRadialGradient(dx, dy, 0, dx, dy, dr * 2.5);
      dropGrad.addColorStop(0, "rgba(255,255,255,0.95)");
      dropGrad.addColorStop(0.5, "rgba(16,185,129,0.7)");
      dropGrad.addColorStop(1, "rgba(16,185,129,0)");
      ctx.fillStyle = dropGrad;
      ctx.beginPath();
      ctx.arc(dx, dy, dr * 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Surface ripples at base
    for (let r = 0; r < 4; r++) {
      const rr = h * (0.08 + r * 0.055) * splashIntensity;
      const ry = cy + h * 0.12;
      ctx.beginPath();
      ctx.ellipse(cx, ry, rr * 1.8, rr * 0.35, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(16,185,129,${0.5 - r * 0.1})`;
      ctx.lineWidth = 1.5 - r * 0.3;
      ctx.stroke();
    }

    ctx.restore();
  }

  // ── Bottle materializing ────────────────────────────────────────────────
  const bottleProgress = p < 0.35 ? 0 : easeInOutCubic((p - 0.35) / 0.65);
  if (bottleProgress > 0.01) {
    ctx.save();

    const bCX = w * 0.5;
    const bBY = h * 0.85; // base
    const bTY = h * 0.12; // top
    const bH = bBY - bTY;
    const bMaxW = w * 0.13; // max half-width

    ctx.globalAlpha = Math.min(1, bottleProgress * 1.4);

    // ── Build bottle path (ribs = structural eco-bottle shape) ──────────
    function bottleHalfWidth(relY: number): number {
      // relY: 0 = top (cap), 1 = base
      // Neck narrow: 0–0.15
      // Shoulder flare: 0.15–0.3
      // Body: 0.3–0.85 (ribbed)
      // Base taper: 0.85–1.0
      if (relY < 0.1) return bMaxW * 0.22 * bottleProgress; // cap
      if (relY < 0.18)
        return bMaxW * (0.22 + ((relY - 0.1) / 0.08) * 0.08) * bottleProgress; // upper neck
      if (relY < 0.28)
        return bMaxW * (0.3 + ((relY - 0.18) / 0.1) * 0.55) * bottleProgress; // shoulder
      if (relY < 0.85) {
        const bodyT = (relY - 0.28) / 0.57;
        // rib modulation: subtle wavy ribbing
        const rib = Math.sin(bodyT * Math.PI * 8) * 0.04;
        return bMaxW * (0.85 + rib) * bottleProgress;
      }
      return bMaxW * (0.85 - ((relY - 0.85) / 0.15) * 0.15) * bottleProgress; // base taper
    }

    const steps = 80;
    const leftPoints: [number, number][] = [];
    const rightPoints: [number, number][] = [];

    for (let i = 0; i <= steps; i++) {
      const relY = i / steps;
      const y = bTY + relY * bH;
      const hw = bottleHalfWidth(relY);
      leftPoints.push([bCX - hw, y]);
      rightPoints.push([bCX + hw, y]);
    }

    // Bottle fill (frosted clear plastic)
    ctx.beginPath();
    leftPoints.forEach(([x, y], i) =>
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y),
    );
    rightPoints
      .slice()
      .reverse()
      .forEach(([x, y]) => ctx.lineTo(x, y));
    ctx.closePath();

    // Plastic gradient: slightly tinted aqua-clear
    const plasticGrad = ctx.createLinearGradient(
      bCX - bMaxW,
      bTY,
      bCX + bMaxW,
      bTY,
    );
    plasticGrad.addColorStop(0, `rgba(140,220,200,${0.15 * bottleProgress})`);
    plasticGrad.addColorStop(
      0.35,
      `rgba(220,255,245,${0.45 * bottleProgress})`,
    );
    plasticGrad.addColorStop(
      0.65,
      `rgba(200,240,230,${0.35 * bottleProgress})`,
    );
    plasticGrad.addColorStop(1, `rgba(130,200,185,${0.15 * bottleProgress})`);
    ctx.fillStyle = plasticGrad;
    ctx.fill();

    // Bottle outline
    ctx.beginPath();
    leftPoints.forEach(([x, y], i) =>
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y),
    );
    rightPoints
      .slice()
      .reverse()
      .forEach(([x, y]) => ctx.lineTo(x, y));
    ctx.closePath();
    ctx.strokeStyle = `rgba(16,185,129,${0.7 * bottleProgress})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Inner highlight stripe (gives glass/plastic premium look)
    const hilW = bMaxW * 0.18;
    const hilGrad = ctx.createLinearGradient(
      bCX - hilW * 0.5,
      bTY,
      bCX + hilW * 0.5,
      bTY,
    );
    hilGrad.addColorStop(0, "rgba(255,255,255,0)");
    hilGrad.addColorStop(0.5, `rgba(255,255,255,${0.55 * bottleProgress})`);
    hilGrad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = hilGrad;
    ctx.fillRect(bCX - hilW, bTY + bH * 0.18, hilW * 2, bH * 0.65);

    // Rib lines
    for (let r = 0; r < 7; r++) {
      const relY = 0.3 + (r / 7) * 0.52;
      const ry = bTY + relY * bH;
      const hw = bottleHalfWidth(relY);
      ctx.beginPath();
      ctx.moveTo(bCX - hw + 2, ry);
      ctx.lineTo(bCX + hw - 2, ry);
      ctx.strokeStyle = `rgba(255,255,255,${0.18 * bottleProgress})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Cap (dark emerald)
    const capW = bottleHalfWidth(0.07);
    const capH = bH * 0.09;
    const capGrad = ctx.createLinearGradient(
      bCX - capW,
      bTY,
      bCX + capW,
      bTY + capH,
    );
    capGrad.addColorStop(0, `rgba(2,44,34,${bottleProgress})`);
    capGrad.addColorStop(1, `rgba(6,78,59,${bottleProgress})`);
    ctx.fillStyle = capGrad;
    ctx.beginPath();
    ctx.roundRect(bCX - capW * 0.95, bTY, capW * 1.9, capH, [4, 4, 0, 0]);
    ctx.fill();

    // Logo mark on bottle (drop icon)
    const logoSize = bMaxW * 0.38 * bottleProgress;
    const logoY = bTY + bH * 0.52;
    ctx.globalAlpha = Math.min(1, (bottleProgress - 0.4) / 0.6) * 0.85;
    ctx.fillStyle = "rgba(16,185,129,0.9)";
    ctx.beginPath();
    ctx.moveTo(bCX, logoY - logoSize * 0.55);
    ctx.bezierCurveTo(
      bCX - logoSize * 0.45,
      logoY - logoSize * 0.1,
      bCX - logoSize * 0.45,
      logoY + logoSize * 0.3,
      bCX,
      logoY + logoSize * 0.4,
    );
    ctx.bezierCurveTo(
      bCX + logoSize * 0.45,
      logoY + logoSize * 0.3,
      bCX + logoSize * 0.45,
      logoY - logoSize * 0.1,
      bCX,
      logoY - logoSize * 0.55,
    );
    ctx.fill();

    // Water inside bottle (fills up as progress increases)
    const waterFill = Math.max(0, (bottleProgress - 0.3) / 0.7);
    if (waterFill > 0) {
      const waterTop = bBY - (bBY - bTY - bH * 0.12) * waterFill;
      ctx.save();
      ctx.beginPath();
      leftPoints.forEach(([x, y], i) =>
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y),
      );
      rightPoints
        .slice()
        .reverse()
        .forEach(([x, y]) => ctx.lineTo(x, y));
      ctx.closePath();
      ctx.clip();
      const waterGrad = ctx.createLinearGradient(0, waterTop, 0, bBY);
      waterGrad.addColorStop(0, `rgba(16,185,129,${0.35 * waterFill})`);
      waterGrad.addColorStop(0.5, `rgba(4,120,87,${0.25 * waterFill})`);
      waterGrad.addColorStop(1, `rgba(2,44,34,${0.4 * waterFill})`);
      ctx.fillStyle = waterGrad;
      ctx.fillRect(bCX - bMaxW, waterTop, bMaxW * 2, bBY - waterTop);
      // water surface ripple
      ctx.beginPath();
      ctx.moveTo(bCX - bMaxW, waterTop);
      for (let wx = bCX - bMaxW; wx <= bCX + bMaxW; wx += 4) {
        const wy =
          waterTop + Math.sin((wx - bCX) * 0.08 + p * 20) * 3 * waterFill;
        ctx.lineTo(wx, wy);
      }
      ctx.strokeStyle = `rgba(255,255,255,${0.5 * waterFill})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    }

    ctx.restore();
  }

  // ── Particle flares ─────────────────────────────────────────────────────
  const flareAlpha = p > 0.6 ? Math.min(1, (p - 0.6) / 0.3) * 0.5 : 0;
  if (flareAlpha > 0) {
    ctx.save();
    for (let f = 0; f < 20; f++) {
      const seed = f * 137.5;
      const fx = w * (0.1 + ((seed * 0.618) % 0.8));
      const fy = h * (0.05 + ((seed * 0.382) % 0.9));
      const fr = 1.5 + (seed % 3);
      ctx.beginPath();
      ctx.arc(fx, fy, fr, 0, Math.PI * 2);
      const fc =
        f % 3 === 0
          ? `rgba(212,175,55,${flareAlpha * 0.8})`
          : `rgba(255,255,255,${flareAlpha * 0.5})`;
      ctx.fillStyle = fc;
      ctx.fill();
    }
    ctx.restore();
  }

  // ── Vignette ─────────────────────────────────────────────────────────────
  const vig = ctx.createRadialGradient(
    w * 0.5,
    h * 0.5,
    h * 0.3,
    w * 0.5,
    h * 0.5,
    h * 0.85,
  );
  vig.addColorStop(0, "rgba(0,0,0,0)");
  vig.addColorStop(1, `rgba(0,0,0,${0.55 - p * 0.4})`);
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, w, h);
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function HydraScrollCanvas({
  scrollYProgress,
  totalFrames,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const dirtyRef = useRef(true);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const progress = frameRef.current / (totalFrames - 1);
    drawFrame(
      ctx,
      canvas.width / (window.devicePixelRatio || 1),
      canvas.height / (window.devicePixelRatio || 1),
      progress,
    );
  }, [totalFrames]);

  // Resize handler — DPR-aware
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
      dirtyRef.current = true;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Render loop (only when dirty)
  useEffect(() => {
    const loop = () => {
      if (dirtyRef.current) {
        render();
        dirtyRef.current = false;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [render]);

  // Subscribe to scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const frame = Math.round(latest * (totalFrames - 1));
    if (frame !== frameRef.current) {
      frameRef.current = frame;
      dirtyRef.current = true;
    }
  });

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
