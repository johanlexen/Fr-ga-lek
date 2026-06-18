"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE_CINEMATIC } from "@/components/motion/primitives";

/**
 * Cinematic boot sequence: a counter races to 100 while the wordmark
 * resolves, then the whole curtain lifts to reveal the hero.
 */
export function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const DURATION = 1900;

    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      // easeOutExpo for a fast-then-settle count
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 350);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: EASE_CINEMATIC }}
        >
          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.05em" }}
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ duration: 1.6, ease: EASE_CINEMATIC }}
            className="font-display text-sm uppercase text-white/70"
          >
            Aurora&nbsp;OS
          </motion.div>

          <div className="mt-8 h-px w-56 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-aurora-grad"
              initial={{ width: "0%" }}
              animate={{ width: `${count}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>

          <div className="mt-4 font-mono text-xs tabular-nums text-white/40">
            {String(count).padStart(3, "0")} / 100
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
