import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import aranyaLogo from "@/assets/aranya-logo-gold.png";

const ease = [0.22, 1, 0.36, 1] as const;

export function LogoLoader({ duration = 2800 }: { duration?: number }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), duration);
    return () => clearTimeout(t);
  }, [duration]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="logo-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.025, filter: "blur(8px)" }}
          transition={{ duration: 0.75, ease }}
          className="paper-panel fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-umber"
        >
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.2, ease }}
            className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
          />
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.22 }}
            transition={{ duration: 1.2 }}
            className="bg-grain pointer-events-none absolute inset-0 mix-blend-soft-light"
          />

          <div className="relative flex flex-col items-center gap-8">
            <motion.div
              initial={{ scale: 0.82, opacity: 0, rotate: -3 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.35, ease }}
              className="relative"
            >
              <motion.div
                className="absolute -inset-8"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 240 240" width="100%" height="100%" aria-hidden>
                  <motion.circle
                    cx="120"
                    cy="120"
                    r="113"
                    fill="none"
                    stroke="var(--sand)"
                    strokeOpacity="0.55"
                    strokeWidth="0.7"
                    strokeDasharray="1 7"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.8, ease }}
                  />
                </svg>
              </motion.div>

              <motion.div
                className="absolute -inset-4"
                animate={{ rotate: -360 }}
                transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 200 200" width="100%" height="100%">
                  <circle
                    cx="100"
                    cy="100"
                    r="96"
                    fill="none"
                    stroke="var(--terra)"
                    strokeOpacity="0.72"
                    strokeWidth="0.65"
                    strokeDasharray="3 9"
                  />
                </svg>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.78, y: 14, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.12, duration: 1.25, ease }}
                className="relative flex items-center justify-center overflow-hidden rounded-full bg-terra/90 p-6 shadow-[0_0_60px_-16px_rgba(185,154,77,0.45)] ring-1 ring-gold/40 md:p-8"
              >
                <img
                  src={aranyaLogo}
                  alt="Aranya — Truly Natural"
                  width={664}
                  height={874}
                  className="h-44 w-auto object-contain md:h-56"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.7, ease }}
              className="flex flex-col items-center gap-3"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 1.45, ease }}
                style={{ transformOrigin: "center" }}
                className="h-px w-48 bg-gradient-to-r from-transparent via-gold to-transparent"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="text-[10px] uppercase tracking-[0.5em] text-sand"
              >
                Rooted in purity
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
