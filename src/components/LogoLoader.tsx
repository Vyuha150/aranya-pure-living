import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import aranyaLogo from "@/assets/aranya-logo.png";

export function LogoLoader({ duration = 2400 }: { duration?: number }) {
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
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="paper-panel fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[var(--umber)]"
        >
          {/* radial warmth */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--gold) 18%, transparent) 0%, transparent 55%)",
            }}
          />
          {/* drifting grain */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ duration: 1.2 }}
            className="bg-grain pointer-events-none absolute inset-0 opacity-30 mix-blend-overlay"
          />

          <div className="relative flex flex-col items-center gap-7">
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* orbiting outer ring */}
              <motion.div
                className="absolute -inset-5"
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 220 220" width="100%" height="100%">
                  <circle
                    cx="110"
                    cy="110"
                    r="106"
                    fill="none"
                    stroke="var(--sand)"
                    strokeOpacity="0.32"
                    strokeWidth="0.5"
                    strokeDasharray="2 5"
                  />
                </svg>
              </motion.div>

              {/* counter-rotating inner dashed ring */}
              <motion.div
                className="absolute -inset-3"
                animate={{ rotate: -360 }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 200 200" width="100%" height="100%">
                  <circle
                    cx="100"
                    cy="100"
                    r="96"
                    fill="none"
                    stroke="var(--terra)"
                    strokeOpacity="0.45"
                    strokeWidth="0.5"
                    strokeDasharray="3 7"
                  />
                </svg>
              </motion.div>

              {/* full logo mark with built-in wordmark */}
              <motion.img
                src={aranyaLogo}
                alt="Aranya"
                width={1024}
                height={1024}
                className="relative h-44 w-44 object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.18)] md:h-52 md:w-52"
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>

            {/* tagline */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-3"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: duration / 1000 - 0.4, ease: "easeInOut" }}
                style={{ transformOrigin: "center" }}
                className="h-px w-44 bg-gradient-to-r from-transparent via-[var(--sand)] to-transparent"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.65 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="text-[10px] uppercase tracking-[0.5em] text-[var(--sand)]"
              >
                sacred botanicals
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
