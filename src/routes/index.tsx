import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Candy,
  CircleDot,
  Coffee,
  Cookie,
  Fish,
  Flower2,
  Leaf,
  ShieldCheck,
  Sparkles,
  Sprout,
  Squirrel,
  Turtle,
  Wheat,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import newOriginVideoUrl from "@/assets/aranya-new-origin.webm";
import snowLeopardVideoUrl from "@/assets/aranya-kenya-snow-leopard.webm";
import elephantVideoUrl from "@/assets/aranya-kenya-elephant.webm";
import ingredientsHero from "@/assets/ingredients-hero.jpg";
import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";
import lifestyleGlow from "@/assets/lifestyle-glow.jpg";
import ritualBundle from "@/assets/ritual-bundle.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aranya Botanicals — Pure, Proven, Natural" },
      { name: "description", content: "Explore certified botanical powders, premixes, tonics and daily rituals, rooted in nature and proven by science." },
      { property: "og:title", content: "Aranya Botanicals — Pure, Proven, Natural" },
      { property: "og:description", content: "A modern apothecary of traceable, certified botanicals." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const films = [
  { video: newOriginVideo.url, place: "Wild origin", subject: "Botanical harvest", number: "01" },
  { video: snowLeopardVideo.url, place: "Kenya Highlands", subject: "Snow leopard", number: "02" },
  { video: elephantVideo.url, place: "Kenyan Savannah", subject: "African elephant", number: "03" },
];

const roots = [
  { name: "Ashwagandha", description: "Sacred root of resilience. Supports calm, strength and vitality.", side: "left" },
  { name: "Triphala", description: "A three-fruit harmony for digestive intelligence and daily renewal.", side: "left" },
  { name: "Brahmi", description: "The herb of meditation, clarity and quiet focus.", side: "left" },
  { name: "Turmeric", description: "The golden root. Pure curcuminoids with powerful antioxidant support.", side: "right" },
  { name: "Tulsi", description: "Holy basil, the queen of herbs. An adaptogen that meets stress with grace.", side: "right" },
  { name: "Moringa", description: "Whole-leaf nourishment with iron, calcium and phytonutrients.", side: "right" },
];

const forms = [
  { name: "Powders", icon: Sprout, animal: "Hornbill · clarity" },
  { name: "Raw packed", icon: Wheat, animal: "Hare · vitality" },
  { name: "Premixes", icon: Flower2, animal: "Kingfisher · balance" },
  { name: "Ready mixes", icon: Coffee, animal: "Tortoise · longevity" },
  { name: "Pastes", icon: CircleDot, animal: "Elephant · strength" },
  { name: "Shreds", icon: Leaf, animal: "Squirrel · readiness" },
  { name: "Toppings", icon: Sparkles, animal: "Butterfly · radiance" },
  { name: "Slices", icon: Fish, animal: "Otter · flow" },
  { name: "Snacks", icon: Cookie, animal: "Rabbit · energy" },
  { name: "Beverages", icon: Turtle, animal: "Crane · ease" },
  { name: "Tablets", icon: ShieldCheck, animal: "Rhino · resolve" },
  { name: "Gummies", icon: Candy, animal: "Deer · gentleness" },
];

const products = [
  { image: p1, type: "Powder", name: "Golden Turmeric", line: "Energise Your Day", description: "Stone-ground Lakadong turmeric with naturally rich curcumin and an earthy lift.", tags: ["Grounding", "Smooth", "Immunity"], price: "₹ 1,240" },
  { image: p2, type: "Oil", name: "Ashwagandha Vitality Oil", line: "Deep Restoration", description: "A cold-pressed root infusion for quiet strength and restorative evenings.", tags: ["Calming", "Adaptogen", "Restorative"], price: "₹ 1,890" },
  { image: p3, type: "Premix", name: "Triphala Morning Premix", line: "Pure · Balanced · Timeless", description: "A gentle three-fruit blend milled for daily digestive intelligence.", tags: ["Balanced", "Digestive", "Mindful"], price: "₹ 1,460" },
  { image: ritualBundle, type: "Latte", name: "Dawn Golden Latte", line: "Gentle Energy", description: "Turmeric, ashwagandha and cinnamon whisked into a warm plant ritual.", tags: ["Uplifting", "Energising", "Daily"], price: "₹ 980" },
  { image: p4, type: "Tonic", name: "Tulsi Amber Tonic", line: "Soft Comfort", description: "Holy basil steeped slowly for warmth, comfort and quiet moments.", tags: ["Aromatic", "Warming", "Comforting"], price: "₹ 2,210" },
  { image: lifestyleGlow, type: "Blend", name: "Luminous Glow Blend", line: "Pure · Radiant · Timeless", description: "A thoughtful blend of amla, rose and moringa for a luminous daily ritual.", tags: ["Refined", "Radiant", "Mindful"], price: "₹ 1,650" },
];

const ease = [0.22, 1, 0.36, 1] as const;

function Home() {
  const [activeFilm, setActiveFilm] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActiveFilm((current) => (current + 1) % films.length), 9000);
    return () => window.clearInterval(timer);
  }, []);

  const film = films[activeFilm];
  if (!film) return null;

  return (
    <div className="paper-home min-h-screen bg-background text-foreground">
      <section className="cinematic-theme relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-background">
        <div className="relative h-full w-full overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.video
                key={film.video}
                src={film.video}
                autoPlay
                muted
                loop
                playsInline
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 1.1, ease }}
                className="h-full w-full object-cover opacity-100 contrast-[1.08] saturate-[1.08]"
              />
            </AnimatePresence>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/15 via-transparent to-background/55" />
          <div className="pointer-events-none absolute inset-3 border border-foreground/15" />

          <SiteHeader immersive />

          <div className="relative z-10 flex h-full min-h-0 flex-col justify-end px-6 pb-7 pt-24 md:px-14 md:pb-9 md:pt-28 lg:px-20">
            <div className="mt-10 grid gap-5 border-t border-foreground/20 pt-5 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="flex flex-wrap items-center gap-5 text-[9px] uppercase tracking-[0.28em] text-foreground/65">
                <span>{film.subject}</span>
                <span className="h-px w-12 bg-gold/70" />
                <span>Certified pure</span>
                <span>10 sec film</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {films.map((item, index) => (
                  <Button
                    key={item.number}
                    type="button"
                    variant="ghost"
                    onClick={() => setActiveFilm(index)}
                    className={`group relative h-auto w-24 overflow-hidden rounded-none border p-0 md:w-36 ${activeFilm === index ? "border-gold" : "border-foreground/20"}`}
                    aria-label={`Show ${item.place}`}
                  >
                    <video src={item.video} muted playsInline className="aspect-video w-full object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
                    <span className="absolute inset-x-0 bottom-0 bg-background/80 px-2 py-1 text-left text-[7px] uppercase tracking-[0.18em] text-foreground">{item.number} · {item.place}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <a href="#roots" aria-label="Explore the botanical philosophy" className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 text-foreground/55 transition hover:text-gold md:block">
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </a>
      </section>

      <section className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl overflow-hidden border border-border bg-card/45">
          <div className="grid lg:grid-cols-[270px_1fr]">
            <aside className="relative border-b border-border p-7 lg:border-b-0 lg:border-r lg:p-8">
              <Leaf className="h-8 w-8 text-accent" strokeWidth={1} />
              <h2 className="mt-5 font-display text-4xl leading-tight">Signature<br />Botanicals</h2>
              <p className="mt-5 max-w-xs text-xs leading-6 text-muted-foreground">Carefully crafted whole-plant preparations that balance tradition and modernity.</p>
              <Button asChild variant="outline" className="mt-6 h-10 rounded-full border-border bg-transparent px-5 text-[9px] uppercase tracking-[0.22em] hover:bg-accent hover:text-accent-foreground"><Link to="/products">Explore botanicals <ArrowRight /></Link></Button>
              <div className="mt-14 border border-border bg-secondary/70 p-5 lg:absolute lg:bottom-8 lg:left-8 lg:right-8">
                <p className="text-[9px] uppercase tracking-[0.24em] text-accent">From the Nilgiris, India</p>
                <p className="mt-3 text-[11px] leading-5 text-muted-foreground">Directly sourced from heritage farms known for rich soil, pure water and patient mastery.</p>
              </div>
            </aside>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product, index) => (
                <motion.article key={product.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: (index % 3) * 0.08, ease }} className="group border-b border-border p-5 sm:border-r last:border-b-0 xl:[&:nth-child(n+4)]:border-b-0">
                  <div className="mx-auto aspect-square w-36 overflow-hidden rounded-full border border-border bg-secondary p-1 md:w-40">
                    <img src={product.image} alt={product.name} loading="lazy" width={768} height={896} className="h-full w-full rounded-full object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <p className="mt-5 inline-flex rounded-full border border-border px-3 py-1 text-[8px] uppercase tracking-[0.2em] text-muted-foreground">{product.type}</p>
                  <h3 className="mt-2 font-display text-xl leading-tight">{product.name}</h3>
                  <p className="mt-1 font-display text-xs italic text-accent">{product.line}</p>
                  <p className="mt-3 min-h-12 text-[10px] leading-5 text-muted-foreground">{product.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1">{product.tags.map((tag) => <span key={tag} className="bg-secondary px-2 py-1 text-[7px] uppercase tracking-[0.14em] text-muted-foreground">{tag}</span>)}</div>
                  <p className="mt-5 font-display text-lg text-accent">{product.price}</p>
                </motion.article>
              ))}
            </div>
          </div>
          <div className="grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">
            {[{ icon: Sparkles, a: "Sun-dried", b: "Slow, low-heat cure" }, { icon: Leaf, a: "Whole plant", b: "Never extracted" }, { icon: ShieldCheck, a: "Certified pure", b: "USDA · India Organic" }, { icon: Squirrel, a: "Hand-packed", b: "Small batches" }].map((item) => (
              <div key={item.a} className="flex items-center gap-3 border-b border-border px-6 py-4 sm:border-r lg:border-b-0"><item.icon className="h-7 w-7 rounded-full bg-secondary p-1.5 text-accent" /><div><p className="text-[9px]">{item.a}</p><p className="text-[7px] uppercase tracking-[0.16em] text-muted-foreground">{item.b}</p></div></div>
            ))}
          </div>
        </div>
      </section>

      <section id="roots" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
            <p className="text-[10px] uppercase tracking-[0.38em] text-accent">Science-driven ingredients</p>
            <h2 className="mt-5 max-w-xl font-display text-5xl leading-[0.98] md:text-7xl">Six roots. <em className="text-accent">One philosophy.</em></h2>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">A carefully selected lineage of botanical compounds—assayed, standardized and verified to support health from root to bloom.</p>
          </motion.div>

          <div className="mt-16 grid items-center gap-10 lg:grid-cols-[1fr_360px_1fr]">
            <div className="space-y-11 text-center lg:text-right">
              {roots.filter((root) => root.side === "left").map((root, index) => <RootNote key={root.name} root={root} index={index} align="right" />)}
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease }} className="relative mx-auto aspect-square w-full max-w-[360px] overflow-hidden border border-border bg-secondary p-3">
              <img src={ingredientsHero} alt="Aranya botanical ingredients and wellness formula" loading="lazy" width={1024} height={1024} className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-5 border border-primary-foreground/30" />
            </motion.div>
            <div className="space-y-11 text-center lg:text-left">
              {roots.filter((root) => root.side === "right").map((root, index) => <RootNote key={root.name} root={root} index={index + 3} align="left" />)}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/55 px-6 py-24 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] uppercase tracking-[0.38em] text-accent">The full apothecary</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-5">
            <h2 className="font-display text-5xl leading-none md:text-7xl">Eleven forms. One purity.</h2>
            <Link to="/products" className="mb-2 flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-accent transition hover:text-foreground">Explore all <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-14 grid grid-cols-2 border-l border-t border-border md:grid-cols-4 lg:grid-cols-6">
            {forms.map((form, index) => (
              <motion.article key={form.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55, delay: (index % 6) * 0.05, ease }} className="group flex min-h-44 flex-col items-center justify-center border-b border-r border-border px-3 py-8 text-center transition-colors hover:bg-card">
                <form.icon className="h-7 w-7 text-accent transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6" strokeWidth={1} />
                <h3 className="mt-5 text-[10px] uppercase tracking-[0.25em]">{form.name}</h3>
                <p className="mt-2 text-[9px] uppercase tracking-[0.12em] text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">{form.animal}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <div className="border-y border-border bg-secondary/60 px-6 py-5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
          {["Fair for Life", "India Organic", "USDA Organic", "FSSAI Certified", "Non-GMO Verified", "Lab Tested"].map((item) => <span key={item} className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-accent" />{item}</span>)}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function RootNote({ root, index, align }: { root: (typeof roots)[number]; index: number; align: "left" | "right" }) {
  return (
    <motion.article initial={{ opacity: 0, x: align === "right" ? -18 : 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: index * 0.06, ease }}>
      <div className={`flex items-center justify-center gap-3 ${align === "right" ? "lg:justify-end" : "lg:justify-start"}`}>
        {align === "left" && <span className="hidden h-px w-8 bg-border lg:block" />}
        <h3 className="font-display text-2xl text-accent">{root.name}</h3>
        {align === "right" && <span className="hidden h-px w-8 bg-border lg:block" />}
      </div>
      <p className="mt-2 text-xs leading-5 text-muted-foreground">{root.description}</p>
    </motion.article>
  );
}