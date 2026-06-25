import { useState } from "react";
import { useMotionValueEvent } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { motion } from "framer-motion";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function ScrollyNavbar({ scrollYProgress }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setScrolled(v > 0.04);
  });

  return (
    <motion.nav
      initial={false}
      animate={scrolled ? "scrolled" : "top"}
      variants={{
        top: {
          backgroundColor: "rgba(2,44,34,0)",
          backdropFilter: "blur(0px)",
          borderBottomColor: "rgba(255,255,255,0)",
        },
        scrolled: {
          backgroundColor: "rgba(2,44,34,0.72)",
          backdropFilter: "blur(18px)",
          borderBottomColor: "rgba(16,185,129,0.15)",
        },
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 border-b"
      style={{ zIndex: 50 }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/experience" className="flex items-center gap-2.5 group">
          {/* Drop icon */}
          <svg
            width="28"
            height="36"
            viewBox="0 0 28 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 0C14 0 1 13 1 22C1 29.18 6.93 35 14 35C21.07 35 27 29.18 27 22C27 13 14 0 14 0Z"
              fill="#10B981"
              className="transition-all duration-300 group-hover:fill-[#D4AF37]"
            />
            <ellipse
              cx="10"
              cy="21"
              rx="3.5"
              ry="5.5"
              fill="rgba(255,255,255,0.25)"
            />
          </svg>

          <div className="flex flex-col leading-none">
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "1.05rem",
                letterSpacing: "0.12em",
                color: "#F9FAFB",
              }}
            >
              HYDRA
              <span style={{ color: "#D4AF37" }}> DROP</span>
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.28em",
                color: "rgba(16,185,129,0.7)",
                textTransform: "uppercase",
              }}
            >
              Premium Water
            </span>
          </div>
        </a>

        {/* Right side */}
        <div className="flex items-center gap-6">
          {/* Nav links — hidden on mobile */}
          <div className="hidden md:flex items-center gap-6">
            {["About", "Products", "Gallery"].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-xs tracking-widest uppercase transition-colors duration-200 hover:text-primary"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "rgba(249,250,251,0.55)",
                }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="/products"
            className="relative group inline-flex items-center gap-2 px-5 py-2.5 text-xs tracking-[0.2em] uppercase overflow-hidden"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#022c22",
              background: "#D4AF37",
              fontWeight: 600,
              transition: "color 0.3s",
            }}
          >
            <span className="relative z-10">Shop Premium</span>
            <span
              className="absolute inset-0 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-400"
              style={{ background: "#10B981" }}
            />
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
