import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logoAsset from "@/assets/aranya-logo.jpg.asset.json";

export function LogoLoader({ duration = 2200 }: { duration?: number }) {
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
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[var(--umber)]"
        >
          {/* radial warmth */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--clay) 28%, transparent) 0%, transparent 55%)",
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

          <div className="relative flex flex-col items-center gap-8">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* orbiting outer ring */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 180 180" width={180} height={180}>
                  <circle
                    cx="90"
                    cy="90"
                    r="86"
                    fill="none"
                    stroke="var(--sand)"
                    strokeOpacity="0.35"
                    strokeWidth="0.6"
                    strokeDasharray="1 4"
                  />
                </svg>
              </motion.div>

              {/* counter-rotating inner dashed ring */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: -360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 180 180" width={180} height={180}>
                  <circle
                    cx="90"
                    cy="90"
                    r="76"
                    fill="none"
                    stroke="var(--terra)"
                    strokeOpacity="0.5"
                    strokeWidth="0.5"
                    strokeDasharray="2 6"
                  />
                </svg>
              </motion.div>

              {/* uploaded logo mark */}
              <motion.img
                src={logoAsset.url}
                alt="Aranya"
                width={160}
                height={160}
                className="relative h-40 w-40 rounded-full object-cover ring-1 ring-sand/20 md:h-44 md:w-44"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>

            {/* wordmark with staggered letters */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex overflow-hidden">
                {"ARANYA".split("").map((ch, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 28, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.6 + i * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="font-display text-[var(--cream)] text-3xl tracking-[0.6em] pl-[0.6em]"
                  >
                    {ch}
                  </motion.span>
                ))}
              </div>

              {/* hairline progress */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: duration / 1000 - 0.3, ease: "easeInOut" }}
                style={{ transformOrigin: "left" }}
                className="h-px w-40 bg-gradient-to-r from-transparent via-[var(--sand)] to-transparent"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="text-[10px] uppercase tracking-[0.5em] text-[var(--sand)]"
              >
                sacred botanicals
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
