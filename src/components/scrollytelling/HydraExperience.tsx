import { useTransform } from "framer-motion";
import { motion } from "framer-motion";
import type { MotionValue } from "framer-motion";

interface Props {
  scrollYProgress: MotionValue<number>;
}

// Phase helper: fade-in at [inStart..inEnd] and fade-out at [outStart..outEnd]
function usePhaseOpacity(
  sv: MotionValue<number>,
  inStart: number,
  inEnd: number,
  outStart: number,
  outEnd: number,
) {
  return useTransform(sv, [inStart, inEnd, outStart, outEnd], [0, 1, 1, 0]);
}

function usePhaseY(
  sv: MotionValue<number>,
  inStart: number,
  inEnd: number,
  outStart: number,
  outEnd: number,
) {
  return useTransform(sv, [inStart, inEnd, outStart, outEnd], [30, 0, 0, -25]);
}

export default function HydraExperience({ scrollYProgress }: Props) {
  // ── Phase 1: The Source (0% → 30%) ───────────────────────────────────────
  const p1Opacity = usePhaseOpacity(scrollYProgress, 0, 0.05, 0.25, 0.32);
  const p1Y = usePhaseY(scrollYProgress, 0, 0.05, 0.25, 0.32);

  // ── Phase 2a: 7-Stage Filtration (33% → 65%) ─────────────────────────────
  const p2aOpacity = usePhaseOpacity(scrollYProgress, 0.33, 0.4, 0.6, 0.68);
  const p2aY = usePhaseY(scrollYProgress, 0.33, 0.4, 0.6, 0.68);

  // ── Phase 2b: pH Balance (40% → 72%) ──────────────────────────────────────
  const p2bOpacity = usePhaseOpacity(scrollYProgress, 0.4, 0.47, 0.65, 0.73);
  const p2bY = usePhaseY(scrollYProgress, 0.4, 0.47, 0.65, 0.73);

  // ── Phase 2c: Purity metric (50% → 75%) ───────────────────────────────────
  const p2cOpacity = usePhaseOpacity(scrollYProgress, 0.5, 0.57, 0.7, 0.76);
  const p2cY = usePhaseY(scrollYProgress, 0.5, 0.57, 0.7, 0.76);

  // ── Phase 3: Perfection (78% → 100%) ─────────────────────────────────────
  const p3Opacity = usePhaseOpacity(scrollYProgress, 0.78, 0.88, 0.97, 1.0);
  const p3Y = usePhaseY(scrollYProgress, 0.78, 0.88, 0.97, 1.0);

  // Gold line width animation for phase 3
  const lineWidth = useTransform(scrollYProgress, [0.82, 0.92], ["0%", "100%"]);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 10 }}
    >
      {/* ── Phase 1: The Source ─────────────────────────────────────────── */}
      <motion.div
        style={{ opacity: p1Opacity, y: p1Y }}
        className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 max-w-xs"
      >
        <p
          className="uppercase tracking-[0.35em] text-xs mb-4"
          style={{
            color: "#10B981",
            fontFamily: "'Inter', sans-serif",
            opacity: 0.85,
          }}
        >
          Origin · Himalayan Peaks
        </p>
        <h1
          className="text-5xl md:text-6xl lg:text-7xl leading-none mb-5"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#F9FAFB",
            fontWeight: 700,
            textShadow: "0 4px 40px rgba(16,185,129,0.35)",
          }}
        >
          The
          <br />
          <em style={{ color: "#10B981", fontStyle: "italic" }}>Source.</em>
        </h1>
        <p
          className="text-sm md:text-base leading-relaxed max-w-[220px]"
          style={{
            color: "rgba(249,250,251,0.65)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Untouched purity, drawn from glacial springs at 4,200 m above sea
          level.
        </p>

        {/* Decorative vertical bar */}
        <div
          className="absolute -left-4 top-0 h-full w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #10B981, transparent)",
          }}
        />
      </motion.div>

      {/* ── Phase 1: right side coordinates ───────────────────────────── */}
      <motion.div
        style={{ opacity: p1Opacity, y: p1Y }}
        className="absolute right-8 md:right-16 bottom-1/4"
      >
        <div
          className="text-right"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "rgba(16,185,129,0.6)",
          }}
        >
          <div className="text-xs tracking-widest uppercase mb-1">
            Coordinates
          </div>
          <div className="text-sm" style={{ color: "rgba(249,250,251,0.4)" }}>
            32.7°N · 78.1°E
          </div>
          <div className="text-sm" style={{ color: "rgba(249,250,251,0.4)" }}>
            4,200 m elevation
          </div>
        </div>
      </motion.div>

      {/* ── Phase 2a: 7-Stage Filtration ──────────────────────────────── */}
      <motion.div
        style={{ opacity: p2aOpacity, y: p2aY }}
        className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 text-right max-w-[260px]"
      >
        <div
          className="inline-block px-3 py-1 rounded-full text-xs tracking-widest uppercase mb-4"
          style={{
            background: "rgba(16,185,129,0.12)",
            border: "1px solid rgba(16,185,129,0.3)",
            color: "#10B981",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Refinement Process
        </div>
        <h2
          className="text-3xl md:text-4xl mb-3"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#F9FAFB",
            fontWeight: 700,
          }}
        >
          7-Stage
          <br />
          Filtration
        </h2>
        <p
          className="text-sm leading-relaxed"
          style={{
            color: "rgba(249,250,251,0.55)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Each molecule refined through seven precision layers — removing every
          impurity, preserving every mineral.
        </p>
      </motion.div>

      {/* ── Phase 2b: pH Balance ───────────────────────────────────────── */}
      <motion.div
        style={{ opacity: p2bOpacity, y: p2bY }}
        className="absolute left-8 md:left-16 bottom-1/3 max-w-[240px]"
      >
        <div className="flex items-end gap-3 mb-3">
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(3rem, 8vw, 5rem)",
              color: "#D4AF37",
              lineHeight: 1,
              fontWeight: 700,
              textShadow: "0 2px 20px rgba(212,175,55,0.4)",
            }}
          >
            7.4
          </span>
          <span
            className="pb-2 text-sm tracking-widest uppercase"
            style={{
              color: "rgba(212,175,55,0.75)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            pH Level
          </span>
        </div>
        <p
          className="text-sm leading-relaxed"
          style={{
            color: "rgba(249,250,251,0.55)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Perfect pH balance — identical to the human body's natural state.
        </p>
      </motion.div>

      {/* ── Phase 2c: Purity stat ─────────────────────────────────────── */}
      <motion.div
        style={{ opacity: p2cOpacity, y: p2cY }}
        className="absolute right-8 md:right-16 bottom-1/4"
      >
        <div className="text-right">
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              color: "#F9FAFB",
              lineHeight: 1,
              fontWeight: 700,
            }}
          >
            99.9<span style={{ color: "#10B981" }}>%</span>
          </div>
          <div
            className="text-xs tracking-widest uppercase mt-2"
            style={{
              color: "rgba(16,185,129,0.7)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Purity Certified
          </div>
          <div
            className="text-xs mt-1"
            style={{
              color: "rgba(249,250,251,0.35)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            ISO 22000 · BIS Certified
          </div>
        </div>
      </motion.div>

      {/* ── Phase 3: Perfection ────────────────────────────────────────── */}
      <motion.div
        style={{ opacity: p3Opacity, y: p3Y }}
        className="absolute inset-x-0 bottom-16 md:bottom-20 flex flex-col items-center text-center px-6"
      >
        {/* Animated gold divider line */}
        <div className="relative h-px mb-8" style={{ width: "200px" }}>
          <div
            className="absolute inset-0"
            style={{ background: "rgba(212,175,55,0.2)" }}
          />
          <motion.div
            style={{ width: lineWidth }}
            className="absolute inset-y-0 left-0"
            transition={{ duration: 1, ease: "easeOut" }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
          />
          <div
            className="h-full"
            style={{
              background:
                "linear-gradient(to right, transparent, #D4AF37, transparent)",
            }}
          />
        </div>

        <p
          className="text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: "#D4AF37", fontFamily: "'Inter', sans-serif" }}
        >
          Hydra Drop · Premium Collection
        </p>
        <h2
          className="text-4xl md:text-5xl lg:text-6xl mb-6 max-w-2xl"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#F9FAFB",
            fontWeight: 700,
            lineHeight: 1.15,
            textShadow: "0 4px 40px rgba(16,185,129,0.25)",
          }}
        >
          Experience the{" "}
          <em style={{ color: "#D4AF37", fontStyle: "italic" }}>Purest</em>{" "}
          Drop.
        </h2>
        <p
          className="text-sm md:text-base mb-8 max-w-md"
          style={{
            color: "rgba(249,250,251,0.6)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Nature's finest, perfected. Every sip is a journey from the source to
          you.
        </p>

        {/* CTA Button — pointer-events on for this one element */}
        <a
          href="/products"
          className="pointer-events-auto group relative inline-flex items-center gap-3 px-8 py-4 text-sm tracking-[0.2em] uppercase overflow-hidden"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "#022c22",
            background: "#D4AF37",
            fontWeight: 600,
          }}
        >
          <span className="relative z-10">Shop Premium</span>
          <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
          <span
            className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500"
            style={{ background: "#10B981" }}
          />
        </a>
      </motion.div>

      {/* ── Scroll hint (very start) ─────────────────────────────────── */}
      <motion.div
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.06], [1, 0]),
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{
            color: "rgba(249,250,251,0.4)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Scroll to explore
        </span>
        <div
          className="w-px h-12 relative overflow-hidden"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          <motion.div
            className="w-full"
            style={{ background: "#10B981" }}
            animate={{ height: ["0%", "100%", "0%"], y: ["0%", "0%", "100%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
