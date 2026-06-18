"use client";

import { motion } from "framer-motion";

/**
 * Ambient drifting aurora blobs + a fine grid, fixed behind all content.
 * Pure CSS/transform animation — cheap and always-on atmosphere.
 */
export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* deep base */}
      <div className="absolute inset-0 bg-ink" />

      {/* drifting colour fields */}
      <motion.div
        className="absolute -left-40 -top-40 h-[55vw] w-[55vw] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.16), transparent 65%)" }}
        animate={{ x: [0, 120, -40, 0], y: [0, 80, 140, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-15vw] top-1/4 h-[50vw] w-[50vw] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(167,139,250,0.18), transparent 65%)" }}
        animate={{ x: [0, -100, 40, 0], y: [0, 120, -60, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-20vw] left-1/3 h-[45vw] w-[45vw] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(232,121,249,0.13), transparent 65%)" }}
        animate={{ x: [0, 80, -80, 0], y: [0, -80, -20, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* faint engineering grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
        }}
      />
    </div>
  );
}
