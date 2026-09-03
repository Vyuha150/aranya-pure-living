import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Leaf,
  ShieldCheck,
  Sparkles,
  Sun,
  FlaskConical,
  Truck,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AranyaMark } from "@/components/AranyaMark";
import heroBowl from "@/assets/hero-bowl.jpg";
import heroProducts from "@/assets/hero-products.jpg";
import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";
import ritualAwaken from "@/assets/ritual-awaken.jpg";
import lifestyleGlow from "@/assets/lifestyle-glow.jpg";
import careImg from "@/assets/care-banner.jpg";
import ingredientsImg from "@/assets/ingredients-hero.jpg";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aranya — Sacred Botanicals, Certified Pure" },
      {
        name: "description",
        content:
          "Premium Ayurvedic botanicals — powders, premixes, tonics, tablets and gummies. Certified pure, ethically sourced, sacredly crafted.",
      },
      { property: "og:title", content: "Aranya — Sacred Botanicals" },
      { property: "og:description", content: "Premium, certified-pure Ayurvedic botanicals." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

const products = [
  { img: p1, name: "Golden Turmeric Powder", tag: "Wildcrafted Root", price: "₹ 1,240" },
  { img: p2, name: "Ashwagandha Vitality Oil", tag: "Cold-Pressed", price: "₹ 1,890" },
  { img: p3, name: "Triphala Morning Premix", tag: "Daily Ritual", price: "₹ 1,460" },
  { img: p4, name: "Tulsi Amber Tonic", tag: "Adaptogen Beverage", price: "₹ 2,210" },
];

const ingredients = [
  {
    name: "Ashwagandha",
    side: "left",
    body: "Sacred root of resilience. Calms the nervous system and rebuilds vitality at the cellular level.",
  },
  {
    name: "Triphala",
    side: "left",
    body: "The three-fruit harmony. Restores digestive intelligence and gentle daily renewal.",
  },
  {
    name: "Brahmi",
    side: "left",
    body: "Cognitive clarity and stillness of mind. The herb of meditation and quiet focus.",
  },
  {
    name: "Turmeric",
    side: "right",
    body: "The golden root. Pure curcuminoid concentrate — anti-inflammatory at its source.",
  },
  {
    name: "Tulsi",
    side: "right",
    body: "Holy basil, the queen of herbs. An adaptogen that meets stress with grace.",
  },
  {
    name: "Moringa",
    side: "right",
    body: "Complete plant nourishment. Iron, calcium and ninety phytonutrients in a single leaf.",
  },
];

const featured = [
  { img: heroBowl, name: "Golden Turmeric", note: "Wildcrafted root" },
  { img: p2, name: "Ashwagandha Oil", note: "Cold-pressed" },
  { img: p3, name: "Triphala Premix", note: "Daily ritual" },
  { img: p4, name: "Tulsi Amber Tonic", note: "Adaptogen" },
  { img: p1, name: "Amla Gold Powder", note: "Vitamin-C rich" },
];


const marquee = [
  "Founders' Edition — 30% off",
  "Single-origin Turmeric — New Harvest",
  "Free pan-India dispatch above ₹2,000",
  "Lab-tested batch ·08· now live",
  "Ashwagandha Vitality Oil — Restocked",
  "Gummies & Tablets — Launch offer",
];

const heroBadges = [
  { icon: Leaf, label: "100% Natural" },
  { icon: FlaskConical, label: "Lab Verified" },
  { icon: Truck, label: "Fresh Dispatch" },
];

const heroStrip = [
  { icon: Sun, title: "Sun-dried", sub: "Slow, low-heat cure" },
  { icon: Leaf, title: "Whole plant", sub: "Never extracted" },
  { icon: ShieldCheck, title: "Certified pure", sub: "USDA · India Organic" },
  { icon: Sparkles, title: "Hand-packed", sub: "Small batches" },
];

const ease = [0.22, 1, 0.36, 1] as const;

function Home() {
  const [[active, dir], setSlide] = useState<[number, number]>([0, 1]);
  const go = (d: number) =>
    setSlide(([a]) => [(a + d + featured.length) % featured.length, d]);
  const item = featured[active];


  return (
    <div className="relative min-h-screen bg-umber text-cream">
      <div className="bg-grain pointer-events-none fixed inset-0 z-50 opacity-[0.12] mix-blend-overlay" />

      {/* HERO */}
      <section className="relative isolate flex min-h-[92svh] flex-col overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-walnut/50 via-umber to-umber" />
        <div
          className="absolute inset-0 -z-10 opacity-50"
          style={{
            background:
              "radial-gradient(50% 40% at 50% 45%, oklch(0.45 0.10 50 / 0.5), transparent 72%)",
          }}
        />

        <SiteHeader />

        {/* offer marquee */}
        <div className="relative z-20 mt-[68px] overflow-hidden border-y border-cream/10 bg-clay/25 py-1.5 backdrop-blur-sm">
          <motion.div
            className="flex w-max gap-10 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          >
            {[...marquee, ...marquee].map((m, i) => (
              <span
                key={i}
                className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-cream/80"
              >
                <Sparkles className="h-3 w-3 text-sand" /> {m}
              </span>
            ))}
          </motion.div>
        </div>

        {/* centered headline */}
        <div className="mx-auto w-full max-w-5xl px-6 pt-6 text-center md:pt-8">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="text-shadow-soft font-display text-[clamp(2.4rem,5.6vw,4.6rem)] leading-[1.03]"
          >
            Taste the Botanical{" "}
            <em className="italic text-terra">Heritage</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="mx-auto mt-3 max-w-xl text-[13px] leading-relaxed text-cream/60"
          >
            Sun-dried, stone-ground Ayurvedic botanicals from single-origin farms.
          </motion.p>
        </div>

        {/* three-column composition */}
        <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-6 px-6 py-4 md:grid-cols-[1fr_1.25fr_1fr] md:gap-5 md:px-10">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease }}
            className="relative z-10 order-2 md:order-1"
          >
            <span className="mb-5 flex items-center gap-3">
              <span className="h-px w-16 bg-sand/40" />
              <AranyaMark size={16} className="text-terra" />
            </span>
            <h2 className="font-display text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[1.15] text-cream">
              Experience the true essence of whole-plant purity
            </h2>
            <div className="mt-7 flex gap-6">
              {heroBadges.map((b, i) => (
                <motion.div
                  key={b.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.1, ease }}
                  className="w-20 text-center"
                >
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 text-sand transition hover:border-sand/60">
                    <b.icon className="h-4 w-4" />
                  </span>
                  <span className="mt-2 block text-[10px] uppercase tracking-[0.16em] text-cream/60">
                    {b.label}
                  </span>
                </motion.div>
              ))}
            </div>
            <a
              href="#catalog"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-cream px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-umber transition hover:bg-sand"
            >
              Shop now
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </a>
          </motion.div>

          {/* CENTER — rotating product */}
          <div className="relative order-1 md:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease }}
              className="relative mx-auto aspect-square w-full max-w-[420px]"
            >
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <AnimatePresence mode="popLayout" initial={false} custom={dir}>
                  <motion.img
                    key={item.name}
                    src={item.img}
                    alt={`${item.name} — ${item.note}`}
                    width={1024}
                    height={1024}
                    custom={dir}
                    initial={{ opacity: 0, scale: 1.08, rotate: dir * 6, x: dir * 60 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0, x: 0 }}
                    exit={{ opacity: 0, scale: 0.94, rotate: dir * -6, x: dir * -60 }}
                    transition={{ duration: 0.7, ease }}
                    className="absolute inset-0 h-full w-full rounded-full object-cover"
                  />
                </AnimatePresence>
              </div>

              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-cream/10" />
              <motion.div
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-5 rounded-full border border-dashed border-sand/25"
              />
              {/* floating chip */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.4, ease }}
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-center"
                >
                  <span className="font-display text-3xl text-cream drop-shadow">
                    {item.name}
                  </span>
                  <span className="mt-1 block text-[10px] uppercase tracking-[0.24em] text-sand/80">
                    {item.note}
                  </span>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* carousel controls */}
            <div className="mt-5 flex items-center justify-center gap-4">
              <button
                aria-label="Previous botanical"
                onClick={() => go(-1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition hover:border-sand hover:text-cream"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <a
                href="#catalog"
                aria-label="Explore collection"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-clay text-cream transition hover:scale-105 hover:bg-terra hover:text-umber"
              >
                <Plus className="h-5 w-5" />
              </a>
              <button
                aria-label="Next botanical"
                onClick={() => go(1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition hover:border-sand hover:text-cream"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* thumbnails */}
            <div className="mt-3 flex items-center justify-center gap-3">
              {featured.map((f, i) => (
                <button
                  key={f.name}
                  aria-label={f.name}
                  onClick={() => setSlide(([a]) => [i, i > a ? 1 : -1])}
                  className={`h-11 w-11 overflow-hidden rounded-full border transition ${
                    i === active
                      ? "scale-110 border-terra"
                      : "border-cream/15 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={f.img} alt={f.name} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>


          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease }}
            className="order-3 md:text-right"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-cream/70">
              <Truck className="h-3 w-3 text-terra" /> Pan-India dispatch
            </span>
            <h2 className="mt-5 font-display text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[1.15]">
              Grown the way the{" "}
              <em className="italic text-terra">forest</em> intended.
            </h2>
            <p className="mt-4 text-[13px] leading-relaxed text-cream/65 md:ml-auto md:max-w-xs">
              Cold-pressed oils, stone-ground powders, no fillers, no preservatives —
              ever.
            </p>
            <a
              href="#story"
              className="group mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-terra hover:text-sand"
            >
              Read our story
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        {/* bottom feature strip */}
        <div className="border-t border-cream/10 bg-walnut/25 backdrop-blur-md">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-3 md:grid-cols-4 md:px-10">
            {heroStrip.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.08, ease }}
                className="flex items-center gap-3"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-clay/25 text-sand">
                  <s.icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-[12px] text-cream/90">{s.title}</span>
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-cream/45">
                    {s.sub}
                  </span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* BEST SELLERS */}
      <section id="catalog" className="relative px-6 py-28 md:px-10 md:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.32em] text-sand/70">
                The Apothecary
              </span>
              <h2 className="mt-4 font-display text-5xl md:text-6xl">Most cherished.</h2>
            </div>
            <a
              href="#"
              className="group inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.25em] text-cream/70 hover:text-cream"
            >
              View all 84 botanicals
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => (
              <article
                key={p.name}
                className="group overflow-hidden rounded-sm border border-cream/8 bg-walnut/30 transition hover:border-sand/30"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-umber">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    width={768}
                    height={896}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full border border-cream/20 bg-umber/60 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-cream/80 backdrop-blur">
                    {p.tag}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4 p-5">
                  <div>
                    <h3 className="font-display text-xl leading-tight">{p.name}</h3>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-cream/50">
                      Add to ritual
                    </p>
                  </div>
                  <span className="font-display text-lg text-sand">{p.price}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CARE / STORY */}
      <section id="story" className="relative px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <span className="text-xs uppercase tracking-[0.32em] text-sand/70">
            Care inspired by nature
          </span>
          <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div className="relative h-[280px] overflow-hidden rounded-sm md:h-[360px]">
              <img
                src={careImg}
                alt="Hand harvesting turmeric root"
                loading="lazy"
                width={1600}
                height={700}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-5 text-cream/75">
              <p className="leading-relaxed">
                For four generations, our growers have tended these soils — turning, drying
                and grinding by the rhythm of the sun. Every batch carries the fingerprint
                of a single farm.
              </p>
              <p className="leading-relaxed">
                We never blend across origins. We never extract. What you receive is the
                whole plant, made fine — nothing added, nothing taken away.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="relative px-6 py-32 md:px-10 md:py-40">
        <div className="mx-auto max-w-5xl text-center">
          <AranyaMark size={56} className="mx-auto text-sand/80" />
          <h2 className="mt-10 font-display text-[clamp(2.4rem,5.5vw,5rem)] leading-[1.05] text-cream">
            Healthy living begins{" "}
            <em className="not-italic italic text-terra">with balance.</em>
            <br />
            <span className="text-sand">Nature</span> already knows the answer.
          </h2>
        </div>
      </section>

      {/* INGREDIENTS */}
      <section className="relative overflow-hidden border-t border-cream/8 bg-walnut/20 px-6 py-28 md:px-10 md:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.32em] text-sand/70">
              Science-Driven Ingredients
            </span>
            <h2 className="mt-4 font-display text-5xl md:text-6xl">
              Six roots. <em className="not-italic italic text-terra">One philosophy.</em>
            </h2>
            <p className="mt-6 text-cream/70 leading-relaxed">
              A carefully selected lineage of vitamins and botanical compounds — assayed,
              standardized and verified to support health from root to bloom.
            </p>
          </div>

          <div className="relative grid gap-12 md:grid-cols-[1fr_auto_1fr] md:items-center">
            {/* LEFT */}
            <div className="space-y-12 md:text-right">
              {ingredients
                .filter((i) => i.side === "left")
                .map((i) => (
                  <div key={i.name} className="md:pr-6">
                    <div className="mb-2 flex items-center gap-3 md:justify-end">
                      <h4 className="font-display text-2xl text-sand">{i.name}</h4>
                      <span className="h-px w-10 bg-sand/40" />
                    </div>
                    <p className="text-sm leading-relaxed text-cream/65">{i.body}</p>
                  </div>
                ))}
            </div>

            {/* CENTER IMAGE */}
            <div className="relative mx-auto aspect-square w-full max-w-[420px]">
              <img
                src={ingredientsImg}
                alt="Aranya botanical bottle"
                loading="lazy"
                width={1024}
                height={1024}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-walnut/40" />
            </div>

            {/* RIGHT */}
            <div className="space-y-12">
              {ingredients
                .filter((i) => i.side === "right")
                .map((i) => (
                  <div key={i.name} className="md:pl-6">
                    <div className="mb-2 flex items-center gap-3">
                      <span className="h-px w-10 bg-sand/40" />
                      <h4 className="font-display text-2xl text-sand">{i.name}</h4>
                    </div>
                    <p className="text-sm leading-relaxed text-cream/65">{i.body}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES STRIP */}
      <section className="border-t border-cream/8 px-6 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <span className="text-xs uppercase tracking-[0.32em] text-sand/70">
            The full apothecary
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">
            Eleven forms. One purity.
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-cream/10 bg-cream/10 md:grid-cols-4 lg:grid-cols-6">
            {[
              "Powders",
              "Raw Packed",
              "Premixes",
              "Ready Mixes",
              "Pastes",
              "Shreds",
              "Toppings",
              "Slices",
              "Snacks",
              "Beverages",
              "Tablets",
              "Gummies",
            ].map((c) => (
              <div
                key={c}
                className="group flex aspect-square cursor-pointer flex-col items-center justify-center gap-3 bg-umber p-4 text-center transition hover:bg-walnut/60"
              >
                <AranyaMark size={26} className="text-sand/70 transition group-hover:text-sand" />
                <span className="text-[11px] uppercase tracking-[0.22em] text-cream/70 group-hover:text-cream">
                  {c}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden px-6 py-28 md:px-10 md:py-36">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-clay/30 via-walnut/40 to-umber" />
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs uppercase tracking-[0.32em] text-sand/80">
            Join the inner circle
          </span>
          <h2 className="mt-6 font-display text-4xl md:text-5xl">
            Letters from the forest.
          </h2>
          <p className="mt-5 text-cream/70">
            Quiet dispatches on rituals, harvests and new arrivals — sent only when
            something is worth sending.
          </p>
          <form className="mx-auto mt-10 flex max-w-md gap-2 border-b border-cream/30 pb-2">
            <input
              type="email"
              placeholder="your@address"
              className="flex-1 bg-transparent py-2 text-sm placeholder:text-cream/40 focus:outline-none"
            />
            <button
              type="submit"
              className="text-[12px] uppercase tracking-[0.25em] text-sand transition hover:text-cream"
            >
              Subscribe →
            </button>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
