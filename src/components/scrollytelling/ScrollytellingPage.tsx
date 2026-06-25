import { useRef } from "react";
import { useScroll } from "framer-motion";
import HydraScrollCanvas from "./HydraScrollCanvas";
import HydraExperience from "./HydraExperience";
import ScrollyNavbar from "./ScrollyNavbar";

const TOTAL_FRAMES = 200;

export default function ScrollytellingPage() {
  // Single scroll source — the 500vh container
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main
      className="relative"
      style={{
        background: "#022c22",
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
      }}
    >
      {/* ── Fixed Navbar ──────────────────────────────────────────────── */}
      <ScrollyNavbar scrollYProgress={scrollYProgress} />

      {/* ── 500vh Scroll Container ───────────────────────────────────── */}
      <div ref={containerRef} style={{ height: "500vh", position: "relative" }}>
        {/* Sticky viewport shell */}
        <div
          className="sticky top-0 w-full overflow-hidden"
          style={{ height: "100vh" }}
        >
          {/* Canvas layer — z-0 */}
          <HydraScrollCanvas
            scrollYProgress={scrollYProgress}
            totalFrames={TOTAL_FRAMES}
          />

          {/* Overlay layer — z-10 */}
          <HydraExperience scrollYProgress={scrollYProgress} />
        </div>
      </div>

      {/* ── Post-scroll section ──────────────────────────────────────── */}
      <section
        style={{ background: "#022c22", padding: "6rem 2rem 8rem" }}
        className="flex flex-col items-center text-center"
      >
        <p
          className="text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: "#10B981", fontFamily: "'Inter', sans-serif" }}
        >
          The Complete Range
        </p>
        <h2
          className="text-4xl md:text-5xl mb-6"
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#F9FAFB",
            fontWeight: 700,
          }}
        >
          Hydra Drop Collection
        </h2>
        <p
          className="max-w-xl mb-10 leading-relaxed"
          style={{
            color: "rgba(249,250,251,0.55)",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          From our glacial spring to your hand — every bottle is a testament to
          nature's perfection, refined by science.
        </p>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {[
            {
              icon: "💧",
              title: "7-Stage Filtration",
              desc: "Precision-engineered to remove every impurity while retaining essential minerals.",
            },
            {
              icon: "⚗️",
              title: "pH Balanced",
              desc: "7.4 pH — perfectly aligned with your body's natural chemistry for optimal hydration.",
            },
            {
              icon: "✦",
              title: "Zero BPA",
              desc: "Ergonomically ribbed, food-grade clear PET. Lightweight, shatter-resistant, earth-conscious.",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="flex flex-col items-start text-left p-6 rounded-sm"
              style={{
                background: "rgba(16,185,129,0.06)",
                border: "1px solid rgba(16,185,129,0.12)",
              }}
            >
              <span className="text-3xl mb-4">{c.icon}</span>
              <h3
                className="text-lg mb-2"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: "#F9FAFB",
                  fontWeight: 700,
                }}
              >
                {c.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(249,250,251,0.5)" }}
              >
                {c.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Gold divider */}
        <div
          className="mt-16 h-px w-24"
          style={{
            background:
              "linear-gradient(to right, transparent, #D4AF37, transparent)",
          }}
        />
      </section>
    </main>
  );
}
