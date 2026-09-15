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

  // The arc completes slightly before the exit, so the reveal feels deliberate.
  const arcDuration = duration * 0.82;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="logo-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03, filter: "blur(10px)" }}
          transition={{ duration: 0.7, ease }}
          className="paper-panel fixed inset-0 z-[200] overflow-hidden bg-umber"
        >
          {/* Soft central vignette keeps the eye on the mark */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 62% 52% at 50% 46%, rgba(185,154,77,0.10), transparent 70%)",
            }}
          />
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.18 }}
            transition={{ duration: 1.4 }}
            className="bg-grain pointer-events-none absolute inset-0 mix-blend-soft-light"
          />

          {/* Mark lockup */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.1, ease }}
                className="relative"
              >
                {/* Quiet orbit — one ring, slow, low contrast */}
                <motion.div
                  aria-hidden
                  className="absolute -inset-7"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
                >
                  <svg viewBox="0 0 200 200" width="100%" height="100%" aria-hidden>
                    <circle
                      cx="100"
                      cy="100"
                      r="97"
                      fill="none"
                      stroke="var(--gold)"
                      strokeOpacity="0.28"
                      strokeWidth="0.6"
                      strokeDasharray="0.5 6"
                    />
                  </svg>
                </motion.div>

                {/* Gold arc — draws clockwise from the top like a precision dial */}
                <svg
                  aria-hidden
                  viewBox="0 0 220 220"
                  className="absolute -inset-10 h-auto w-auto -rotate-90"
                >
                  <circle
                    cx="110"
                    cy="110"
                    r="106"
                    fill="none"
                    stroke="var(--gold)"
                    strokeOpacity="0.16"
                    strokeWidth="0.75"
                  />
                  <motion.circle
                    cx="110"
                    cy="110"
                    r="106"
                    fill="none"
                    stroke="var(--gold)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: arcDuration / 1000, ease: "easeInOut" }}
                  />
                </svg>

                {/* Logo in its warm circular frame */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, filter: "blur(6px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ delay: 0.1, duration: 1.1, ease }}
                  className="relative flex items-center justify-center overflow-hidden rounded-full bg-terra/90 p-6 shadow-[0_0_70px_-18px_rgba(185,154,77,0.55)] ring-1 ring-gold/35 md:p-7"
                >
                  <img
                    src={aranyaLogo}
                    alt="Aranya — Truly Natural"
                    width={664}
                    height={874}
                    className="h-40 w-auto object-contain md:h-48"
                  />
                </motion.div>
              </motion.div>

              {/* Wordmark lockup */}
              <div className="mt-10 flex flex-col items-center gap-4">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 1.2, ease }}
                  style={{ transformOrigin: "center" }}
                  className="h-px w-40 bg-gradient-to-r from-transparent via-gold/70 to-transparent"
                />
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 0.85, y: 0 }}
                  transition={{ delay: 0.85, duration: 0.8, ease }}
                  className="text-[10px] font-medium uppercase tracking-[0.55em] text-sand"
                >
                  Rooted in purity
                </motion.p>
              </div>
            </div>
          </div>

          {/* Hairline progress bar — quiet confirmation at the base */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-sand/15">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-gold/20 via-gold to-gold/60"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: arcDuration / 1000, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
