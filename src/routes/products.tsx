import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Filter, Sparkles, ShieldCheck, Tag } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { AranyaMark } from "@/components/AranyaMark";
import productsHero from "@/assets/products-hero.jpg";
import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Aranya Apothecary" },
      {
        name: "description",
        content:
          "Shop the Aranya apothecary — powders, premixes, tonics, tablets and gummies. Single-origin, lab-tested, certified pure. Founders' Edition save up to 30%.",
      },
      { property: "og:title", content: "Aranya Products — Founders' Edition" },
      {
        property: "og:description",
        content: "Up to 30% off the inaugural collection. Limited harvest, hand-packed.",
      },
    ],
  }),
  component: ProductsPage,
});

const categories = [
  "All",
  "Powders",
  "Premixes",
  "Tonics",
  "Pastes",
  "Snacks",
  "Tablets",
  "Gummies",
];

const grid = [
  { img: p1, name: "Golden Turmeric Powder", tag: "Powders", price: 1240, was: 1640, badge: "−24%" },
  { img: p2, name: "Ashwagandha Vitality Oil", tag: "Tonics", price: 1890, was: 2490, badge: "−24%" },
  { img: p3, name: "Triphala Morning Premix", tag: "Premixes", price: 1460, was: 1990, badge: "−27%" },
  { img: p4, name: "Tulsi Amber Tonic", tag: "Tonics", price: 2210, was: 2890, badge: "−23%" },
  { img: p1, name: "Moringa Greens Powder", tag: "Powders", price: 1180, was: 1490, badge: "Best Seller" },
  { img: p3, name: "Brahmi Focus Gummies", tag: "Gummies", price: 1690, was: 2190, badge: "New" },
  { img: p2, name: "Forest Honey Paste", tag: "Pastes", price: 1340, was: 1690, badge: "−20%" },
  { img: p4, name: "Shatavari Bliss Tablets", tag: "Tablets", price: 1990, was: 2590, badge: "−23%" },
];

function ProductsPage() {
  return (
    <div className="relative bg-umber text-cream">
      <div className="bg-grain pointer-events-none fixed inset-0 z-50 opacity-[0.12] mix-blend-overlay" />

      <PageHero
        eyebrow="Founders' Edition · Save up to 30%"
        title={
          <>
            The whole apothecary,{" "}
            <em className="not-italic italic text-terra">in 84 forms.</em>
          </>
        }
        subtitle="Single-origin botanicals, lab-tested and hand-packed. Free shipping over ₹1,500. Inaugural pricing ends with the harvest."
        image={productsHero}
        imageAlt="Aranya botanical product flat-lay"
      />

      {/* SALE STRIP */}
      <div className="border-y border-cream/10 bg-walnut/30">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-2 px-6 py-3 text-[11px] uppercase tracking-[0.28em] text-cream/70 md:px-10">
          <span className="flex items-center gap-2"><Tag className="h-3.5 w-3.5 text-terra" /> Founders' edition · 30% off</span>
          <span className="hidden md:flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5" /> 60-day purity guarantee</span>
          <span className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-sand" /> Free ritual sample with every order</span>
        </div>
      </div>

      {/* FILTERS + GRID */}
      <section className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-10 flex flex-wrap items-center justify-between gap-6">
              <div>
                <span className="text-xs uppercase tracking-[0.32em] text-sand/70">The catalog</span>
                <h2 className="mt-3 font-display text-4xl md:text-5xl">Browse by ritual.</h2>
              </div>
              <button className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-cream/70 hover:border-sand/50 hover:text-cream">
                <Filter className="h-3.5 w-3.5" /> Refine
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mb-12 flex flex-wrap gap-2">
              {categories.map((c, i) => (
                <button
                  key={c}
                  className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition ${
                    i === 0
                      ? "border-sand bg-sand text-umber"
                      : "border-cream/15 text-cream/70 hover:border-sand/50 hover:text-cream"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {grid.map((p, i) => (
              <motion.article
                key={p.name + i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
                className="group relative overflow-hidden rounded-sm border border-cream/8 bg-walnut/30 transition hover:border-sand/30"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-umber">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-terra px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-umber">
                    {p.badge}
                  </span>
                  <span className="absolute right-4 top-4 rounded-full border border-cream/20 bg-umber/60 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-cream/80 backdrop-blur">
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
                  <div className="text-right">
                    <span className="block font-display text-lg text-sand">₹ {p.price.toLocaleString()}</span>
                    <span className="text-[11px] text-cream/40 line-through">₹ {p.was.toLocaleString()}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* INFOGRAPHIC: SUPPLY CHAIN */}
      <section className="border-t border-cream/8 bg-walnut/20 px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.32em] text-sand/70">From soil to ritual</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Five touches. <em className="italic text-terra not-italic">No shortcuts.</em></h2>
          </Reveal>

          <div className="relative mt-16 grid gap-8 md:grid-cols-5">
            <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-sand/40 to-transparent md:block" />
            {[
              { n: "01", h: "Single-origin farm", b: "Western Ghats. One soil, one farmer." },
              { n: "02", h: "Sun-dried", b: "Slow cure under monsoon-clean light." },
              { n: "03", h: "Cold-milled", b: "Stone-ground at low heat to preserve potency." },
              { n: "04", h: "Lab-assayed", b: "Curcuminoid & withanolide standardised." },
              { n: "05", h: "Hand-packed", b: "Sealed in amber within 48 hours." },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08} className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-sand/40 bg-umber font-display text-lg text-sand">
                  {s.n}
                </div>
                <h4 className="mt-5 font-display text-lg">{s.h}</h4>
                <p className="mt-2 text-[13px] text-cream/60">{s.b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <AranyaMark size={48} className="text-sand/80" />
          <h2 className="mt-8 font-display text-4xl md:text-5xl">
            The first 500 orders ship with a hand-numbered card.
          </h2>
          <p className="mt-5 max-w-xl text-cream/65">
            Founders' pricing closes when the inaugural harvest sells through. Once gone, retail returns to full.
          </p>
          <Link
            to="/"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-cream px-6 py-3 text-[12px] uppercase tracking-[0.25em] text-umber transition hover:bg-sand"
          >
            Claim founders' pricing
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
