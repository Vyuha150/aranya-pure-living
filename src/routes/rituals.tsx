import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sun, Moon, Sunrise, Sunset } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import ritualsHero from "@/assets/rituals-hero.jpg";

export const Route = createFileRoute("/rituals")({
  head: () => ({
    meta: [
      { title: "Daily Rituals — Aranya" },
      {
        name: "description",
        content:
          "Four moments. Four botanicals. A guided day-to-night ritual built around your circadian rhythm.",
      },
      { property: "og:title", content: "Aranya — Daily Rituals" },
      { property: "og:description", content: "A botanical companion for every hour of the day." },
    ],
  }),
  component: RitualsPage,
});

const rituals = [
  {
    icon: Sunrise,
    time: "06 : 30",
    name: "Awaken",
    botanical: "Triphala Morning Premix",
    body: "Warm water, half a teaspoon. Restores digestive intelligence before the first thought.",
    color: "from-terra/40 to-transparent",
  },
  {
    icon: Sun,
    time: "11 : 00",
    name: "Sustain",
    botanical: "Ashwagandha Vitality Oil",
    body: "Three drops in adaptogen tea. Steady the nervous system through the noon climb.",
    color: "from-gold/40 to-transparent",
  },
  {
    icon: Sunset,
    time: "17 : 30",
    name: "Soften",
    botanical: "Tulsi Amber Tonic",
    body: "Sip cool. Meets the day's stress with grace, prepares the breath for evening.",
    color: "from-clay/50 to-transparent",
  },
  {
    icon: Moon,
    time: "22 : 00",
    name: "Surrender",
    botanical: "Brahmi Stillness Tablet",
    body: "One tablet before sleep. Quiets the cognitive loop, opens the door to deep rest.",
    color: "from-walnut/60 to-transparent",
  },
];

function RitualsPage() {
  return (
    <div className="relative bg-umber text-cream">
      <div className="bg-grain pointer-events-none fixed inset-0 z-50 opacity-[0.12] mix-blend-overlay" />

      <PageHero
        eyebrow="Day-to-night ritual"
        title={
          <>
            Four moments.{" "}
            <em className="not-italic italic text-terra">One quiet day.</em>
          </>
        }
        subtitle="A botanical companion for the hinges of your day — when the body asks for help and the wise know to listen."
        image={ritualsHero}
        imageAlt="Morning ritual — golden latte"
      />

      {/* CIRCADIAN INFOGRAPHIC */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.32em] text-sand/70">The circadian arc</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Built around your hours.</h2>
          </Reveal>

          <div className="mt-16 space-y-6">
            {rituals.map((r, i) => {
              const Icon = r.icon;
              return (
                <motion.div
                  key={r.name}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative grid items-center gap-6 overflow-hidden rounded-sm border border-cream/10 bg-gradient-to-r ${r.color} bg-walnut/20 px-6 py-8 md:grid-cols-[120px_180px_1fr_auto] md:px-10 md:py-10`}
                >
                  <div className="flex items-center gap-4">
                    <Icon className="h-7 w-7 text-sand" />
                    <span className="font-display text-2xl text-sand md:hidden">{r.time}</span>
                  </div>
                  <span className="hidden font-display text-3xl text-sand md:block">{r.time}</span>
                  <div>
                    <h3 className="font-display text-3xl">{r.name}</h3>
                    <p className="mt-1 text-[12px] uppercase tracking-[0.22em] text-terra/90">{r.botanical}</p>
                    <p className="mt-3 max-w-xl text-cream/70">{r.body}</p>
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-cream/50">
                    {String(i + 1).padStart(2, "0")} / 04
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* RITUAL BUNDLE */}
      <section className="border-t border-cream/8 bg-walnut/30 px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-5xl items-center gap-10 text-center">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.32em] text-sand/70">The complete ritual</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">All four, gifted as one.</h2>
            <p className="mx-auto mt-5 max-w-xl text-cream/65">
              The Day Cycle Set arrives in a single linen-bound box, with a hand-printed ritual guide.
            </p>
            <div className="mt-8 flex flex-wrap items-baseline justify-center gap-4">
              <span className="font-display text-5xl text-sand">₹ 5,490</span>
              <span className="text-cream/40 line-through">₹ 7,790</span>
              <span className="rounded-full bg-terra px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-umber">Save 30%</span>
            </div>
            <Link to="/products" className="group mt-10 inline-flex items-center gap-3 rounded-full bg-cream px-6 py-3 text-[12px] uppercase tracking-[0.25em] text-umber transition hover:bg-sand">
              Begin the ritual
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
