import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AranyaMark } from "@/components/AranyaMark";
import heroImg from "@/assets/hero-products.jpg";
import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";
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

function Home() {
  return (
    <div className="relative min-h-screen bg-umber text-cream">
      <div className="bg-grain pointer-events-none fixed inset-0 z-50 opacity-[0.12] mix-blend-overlay" />

      {/* HERO */}
      <section className="relative isolate min-h-[100svh] overflow-hidden">
        <img
          src={heroImg}
          alt="Aranya botanical jars on moss"
          width={1280}
          height={1280}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="bg-vignette absolute inset-0 -z-10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-umber/80 via-umber/30 to-umber" />

        <SiteHeader />

        <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 pt-32 pb-24 md:px-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-sand/80">
              <span className="h-px w-10 bg-sand/50" /> Est. in the wild
            </span>
            <h1 className="text-shadow-soft mt-8 font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] text-cream">
              Rooted in <em className="text-terra not-italic font-light italic">reverence.</em>
              <br />
              Grown for the <span className="text-sand">few.</span>
            </h1>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-cream/75">
              Aranya is a sanctuary of certified-pure botanicals — powders, premixes, tonics
              and tablets — cultivated by hand and proven by science. For those who consume
              with intention, and live to flourish.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href="#catalog"
                className="group inline-flex items-center gap-3 rounded-full bg-cream px-7 py-3.5 text-[13px] uppercase tracking-[0.22em] text-umber transition hover:bg-sand"
              >
                Shop the collection
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <a
                href="#story"
                className="text-[13px] uppercase tracking-[0.22em] text-cream/70 underline-offset-8 hover:text-cream hover:underline"
              >
                Our philosophy
              </a>
            </div>
          </div>
        </div>

        {/* trust strip */}
        <div className="absolute inset-x-0 bottom-0 border-t border-cream/10 bg-umber/60 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-y-3 px-6 py-4 text-[11px] uppercase tracking-[0.28em] text-cream/55 md:px-10">
            <span className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5" /> USDA Organic</span>
            <span className="flex items-center gap-2"><Leaf className="h-3.5 w-3.5" /> India Organic</span>
            <span className="hidden md:inline">FSSAI Certified</span>
            <span className="hidden md:inline">Lab-tested · Single Origin</span>
            <span className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5" /> Hand-packed</span>
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
