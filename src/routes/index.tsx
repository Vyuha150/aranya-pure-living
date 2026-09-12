import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Bird,
  Fish,
  Leaf,
  Play,
  Rabbit,
  ShieldCheck,
  Snail,
  Squirrel,
  Turtle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import westernGhatsVideo from "@/assets/aranya-western-ghats.webm.asset.json";
import snowLeopardVideo from "@/assets/aranya-kenya-snow-leopard.webm.asset.json";
import elephantVideo from "@/assets/aranya-kenya-elephant.webm.asset.json";
import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aranya — Wild Origins, Sacred Botanicals" },
      {
        name: "description",
        content: "Discover certified-pure botanicals through the wild landscapes and species that inspire every Aranya collection.",
      },
      { property: "og:title", content: "Aranya — Wild Origins, Sacred Botanicals" },
      { property: "og:description", content: "Nature-led wellness, traced from origin to ritual." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const films = [
  {
    video: westernGhatsVideo.url,
    region: "The Western Ghats",
    title: "Pepper & Herbal Tonic",
    species: "Nilgiri Tahr",
    index: "01",
  },
  {
    video: snowLeopardVideo.url,
    region: "Kenya Highlands",
    title: "Baobab & Moringa",
    species: "Snow Leopard",
    index: "02",
  },
  {
    video: elephantVideo.url,
    region: "Kenyan Savannah",
    title: "Ancient Vitality",
    species: "African Elephant",
    index: "03",
  },
];

const families = [
  { icon: Bird, title: "Powders", trait: "Clarity", text: "Whole roots, stone-ground slowly." },
  { icon: Rabbit, title: "Premixes", trait: "Vitality", text: "Daily blends built for absorption." },
  { icon: Fish, title: "Oils", trait: "Flow", text: "Cold-pressed botanical infusions." },
  { icon: Turtle, title: "Tonics", trait: "Longevity", text: "Deep nourishment, ready to drink." },
  { icon: Squirrel, title: "Ritual Sets", trait: "Readiness", text: "Complete routines for daily rhythm." },
  { icon: Snail, title: "Blends", trait: "Patience", text: "Measured formulas, naturally complete." },
];

const products = [
  { image: p1, name: "Golden Turmeric", note: "Western Ghats · Powder", price: "₹1,240" },
  { image: p2, name: "Ashwagandha Vitality", note: "Cold-pressed · Oil", price: "₹1,890" },
  { image: p3, name: "Triphala Morning", note: "Three-fruit · Premix", price: "₹1,460" },
  { image: p4, name: "Tulsi Amber", note: "Adaptogenic · Tonic", price: "₹2,210" },
];

const ease = [0.22, 1, 0.36, 1] as const;

function Home() {
  const [activeFilm, setActiveFilm] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -45]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveFilm((current) => (current + 1) % films.length);
    }, 10000);
    return () => window.clearInterval(timer);
  }, []);

  const film = films[activeFilm];
  if (!film) return null;

  return (
    <div className="cinematic-theme min-h-screen bg-background text-foreground">
      <section ref={heroRef} className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-background">
        <motion.div style={{ y: videoY }} className="absolute inset-0 scale-110">
          <video
            aria-hidden="true"
            src={westernGhatsVideo.url}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover opacity-35 blur-[2px]"
          />
          <div className="absolute inset-0 bg-background/60" />
        </motion.div>

        <div className="relative h-full w-full overflow-hidden bg-background">
          <AnimatePresence mode="wait">
            <motion.video
              key={film.video}
              src={film.video}
              autoPlay
              muted
              loop
              playsInline
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 1.1, ease }}
              className="absolute inset-0 h-full w-full object-contain"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/20 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-transparent to-background/90" />
          <div className="pointer-events-none absolute inset-3 border border-foreground/15" />

          <SiteHeader />

          <div className="relative z-10 flex h-full min-h-0 flex-col justify-end px-6 pb-7 pt-24 md:px-14 md:pb-9 md:pt-28 lg:px-20">
            <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 items-center gap-3 lg:flex" style={{ writingMode: "vertical-rl" }}>
              <span className="h-12 w-px bg-gold/60" />
              <span className="text-[9px] uppercase tracking-[0.42em] text-foreground/70">Explore the origin</span>
            </div>

            <motion.div style={{ y: titleY }} className="mb-auto mt-auto max-w-4xl pt-20">
              <motion.p
                key={`${film.index}-eyebrow`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.42em] text-gold"
              >
                <span className="h-px w-12 bg-gold" /> Origin collection · {film.index}
              </motion.p>
              <div className="relative">
                <motion.h1
                  initial={{ opacity: 0, y: 55 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.15, ease }}
                  className="font-display text-[clamp(5rem,13vw,11rem)] leading-[0.7] text-foreground"
                >
                  WILD
                  <span className="block text-transparent [-webkit-text-stroke:1px_color-mix(in_oklab,var(--foreground)_65%,transparent)]">NATURE</span>
                </motion.h1>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={film.title}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 24 }}
                    transition={{ duration: 0.65, ease }}
                    className="mt-7 max-w-md"
                  >
                    <p className="font-display text-2xl italic text-foreground md:text-3xl">{film.region}</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                      Premium botanicals shaped by altitude, monsoon and ancient growing wisdom. Pure at origin, proven in every batch.
                    </p>
                  </motion.div>
                </AnimatePresence>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <Button asChild className="h-12 rounded-none bg-gold px-7 text-[10px] uppercase tracking-[0.26em] text-background hover:bg-foreground">
                    <Link to="/products">Explore collection <ArrowRight /></Link>
                  </Button>
                  <Button asChild variant="outline" className="h-12 rounded-none border-foreground/35 bg-background/20 px-7 text-[10px] uppercase tracking-[0.26em] text-foreground backdrop-blur-md hover:bg-foreground hover:text-background">
                    <Link to="/philosophy"><Play /> Our story</Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            <div className="mt-10 grid gap-5 border-t border-foreground/20 pt-5 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="flex items-center gap-5 text-[9px] uppercase tracking-[0.28em] text-foreground/65">
                <span>{film.species}</span><span className="h-px w-12 bg-gold/70" /><span>Certified pure</span><span>10 sec film</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {films.map((item, index) => (
                  <Button
                    key={item.title}
                    type="button"
                    variant="ghost"
                    onClick={() => setActiveFilm(index)}
                    className={`group relative h-auto w-24 overflow-hidden rounded-none border p-0 md:w-36 ${activeFilm === index ? "border-gold" : "border-foreground/20"}`}
                    aria-label={`Show ${item.region}`}
                  >
                    <video src={item.video} muted playsInline className="aspect-video w-full object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
                    <span className="absolute inset-x-0 bottom-0 bg-background/80 px-2 py-1 text-left text-[7px] uppercase tracking-[0.18em] text-foreground">{item.index} · {item.region}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <a href="#origins" aria-label="Discover more" className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 text-foreground/55 transition hover:text-gold md:block">
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </a>
      </section>

      <section id="origins" className="border-y border-gold/25 bg-secondary px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.42em] text-gold">The living taxonomy</p>
              <h2 className="mt-5 max-w-xl font-display text-5xl leading-[0.95] md:text-7xl">Every form carries a wild instinct.</h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-foreground/65 lg:justify-self-end">
              Each product family is represented by an animal whose defining instinct mirrors its purpose—from the hornbill’s clarity to the tortoise’s longevity.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-2 border-l border-t border-gold/25 md:grid-cols-3 lg:grid-cols-6">
            {families.map((family, index) => (
              <motion.article
                key={family.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: index * 0.06, ease }}
                className="group min-h-64 border-b border-r border-gold/25 p-5 transition-colors hover:bg-accent/15"
              >
                <span className="text-[9px] tracking-[0.3em] text-gold">0{index + 1}</span>
                <family.icon className="my-8 h-14 w-14 text-gold transition-transform duration-500 group-hover:-translate-y-2" strokeWidth={0.75} />
                <h3 className="font-display text-2xl">{family.title}</h3>
                <p className="mt-1 font-display text-sm italic text-gold">{family.trait}</p>
                <p className="mt-4 text-xs leading-5 text-foreground/55">{family.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background px-6 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div><p className="text-[10px] uppercase tracking-[0.42em] text-gold">The apothecary</p><h2 className="mt-4 font-display text-5xl md:text-7xl">From wilderness to ritual.</h2></div>
            <Link to="/products" className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-foreground/70 transition hover:text-gold">View all botanicals <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-px bg-gold/25 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <motion.article key={product.name} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="group bg-background">
                <div className="aspect-[4/5] overflow-hidden"><img src={product.image} alt={product.name} loading="lazy" width={768} height={960} className="h-full w-full object-cover transition duration-1000 group-hover:scale-105" /></div>
                <div className="border-t border-gold/25 p-5"><p className="text-[9px] uppercase tracking-[0.25em] text-gold">{product.note}</p><div className="mt-3 flex items-start justify-between gap-4"><h3 className="font-display text-xl">{product.name}</h3><span className="text-sm text-foreground/70">{product.price}</span></div></div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-gold/25 bg-secondary px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
            <p className="text-[10px] uppercase tracking-[0.42em] text-gold">Film journal · 02</p>
            <h2 className="mt-5 font-display text-5xl leading-none md:text-7xl">Different lands.<br /><em className="text-gold">A deeper you.</em></h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-foreground/65">Trace our ingredients across climates, species and old growing cultures. Every origin has a character. Every formula keeps its story intact.</p>
            <Button asChild variant="outline" className="mt-8 h-12 rounded-none border-gold/45 bg-transparent px-7 text-[10px] uppercase tracking-[0.28em] text-foreground hover:bg-gold hover:text-background"><Link to="/journal">Enter the journal <ArrowRight /></Link></Button>
          </motion.div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[films[1], films[2]].map((item) => item && (
              <motion.div key={item.video} whileHover={{ y: -6 }} transition={{ duration: 0.4 }} className="group relative aspect-video overflow-hidden border border-gold/30">
                <video src={item.video} autoPlay muted loop playsInline className="h-full w-full object-cover transition duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5"><p className="text-[8px] uppercase tracking-[0.3em] text-gold">Origin film · {item.index}</p><p className="mt-1 font-display text-2xl">{item.region}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background px-6 py-24 text-center md:px-10 md:py-36">
        <Leaf className="mx-auto h-8 w-8 text-gold" strokeWidth={1} />
        <p className="mt-7 text-[10px] uppercase tracking-[0.42em] text-gold">Certified by nature · verified by science</p>
        <h2 className="mx-auto mt-6 max-w-4xl font-display text-5xl leading-[1.02] md:text-7xl">Pure enough to trace.<br /><em className="text-gold">Beautiful enough to show.</em></h2>
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-4 border-y border-gold/25 py-5 text-[9px] uppercase tracking-[0.25em] text-foreground/60">
          {["USDA Organic", "India Organic", "Non-GMO", "Lab Verified"].map((item) => <span key={item} className="flex items-center gap-2"><ShieldCheck className="h-3 w-3 text-gold" />{item}</span>)}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}