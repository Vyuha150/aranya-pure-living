import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Leaf, Minus, Plus, ShieldCheck, Sparkles, Squirrel, Truck } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { AddToCartButton } from "@/components/AddToCartButton";
import { BuyNowButton } from "@/components/BuyNowButton";
import { catalog, getProduct } from "@/lib/catalog";

const ease = [0.22, 1, 0.36, 1] as const;

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.name} — Aranya Apothecary` : "Product — Aranya Apothecary" },
      { name: "description", content: loaderData?.description ?? "Single-origin Aranya botanical." },
      { property: "og:title", content: loaderData ? `${loaderData.name} — Aranya Apothecary` : "Aranya Product" },
      { property: "og:description", content: loaderData?.description ?? "" },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  notFoundComponent: ProductMissing,
  component: ProductDetail,
});

function ProductDetail() {
  const product = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const related = catalog.filter((p) => p.slug !== product.slug).slice(0, 3);
  const discount = product.was ? Math.round((1 - product.price / product.was) * 100) : null;

  return (
    <div className="paper-home min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="px-6 pb-20 pt-32 md:px-10 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <Link to="/products" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-muted-foreground transition hover:text-accent">
              <ArrowLeft className="h-3.5 w-3.5" /> All botanicals
            </Link>
          </motion.div>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            {/* IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease }}
              className="relative mx-auto aspect-square w-full max-w-[440px]"
            >
              <div className="absolute -inset-6 rounded-full border border-dashed border-accent/30" />
              <div className="h-full w-full overflow-hidden rounded-full border border-border bg-secondary p-2">
                <img src={product.image} alt={product.name} width={768} height={896} className="h-full w-full rounded-full object-cover" />
              </div>
              {(discount || (product.badge && !product.badge.startsWith("−"))) && (
                <span className="absolute right-4 top-4 rounded-full bg-accent px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-accent-foreground">
                  {discount ? `−${discount}%` : product.badge}
                </span>
              )}
            </motion.div>

            {/* DETAILS */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease }}>
              <p className="inline-flex rounded-full border border-border px-4 py-1.5 text-[9px] uppercase tracking-[0.24em] text-muted-foreground">{product.category}</p>
              <h1 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">{product.name}</h1>
              <p className="mt-3 font-display text-lg italic text-accent">{product.line}</p>

              <div className="mt-6 flex items-end gap-4">
                <span className="font-display text-4xl text-accent">₹ {product.price.toLocaleString("en-IN")}</span>
                {product.was && <span className="pb-1 text-lg text-muted-foreground line-through">₹ {product.was.toLocaleString("en-IN")}</span>}
                {discount && <span className="pb-1 text-[10px] uppercase tracking-[0.22em] text-accent">Save {discount}%</span>}
              </div>

              <p className="mt-6 text-sm leading-7 text-muted-foreground">{product.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="bg-secondary px-3 py-1.5 text-[9px] uppercase tracking-[0.16em] text-muted-foreground">{tag}</span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-4 rounded-full border border-border px-4 py-3">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" className="text-muted-foreground transition hover:text-accent">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-6 text-center text-sm">{qty}</span>
                  <button onClick={() => setQty((q) => Math.min(99, q + 1))} aria-label="Increase quantity" className="text-muted-foreground transition hover:text-accent">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <AddToCartButton
                  slug={product.slug}
                  qty={qty}
                  className="rounded-full bg-foreground px-8 py-4 text-[11px] uppercase tracking-[0.25em] text-background hover:bg-accent hover:text-accent-foreground"
                />
                <BuyNowButton
                  slug={product.slug}
                  qty={qty}
                  className="rounded-full border border-accent px-8 py-4 text-[11px] uppercase tracking-[0.25em] text-accent transition hover:bg-accent hover:text-accent-foreground"
                />
              </div>
              <p className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <Truck className="h-4 w-4 text-accent" /> Free shipping over ₹ 1,500 · ships in 48 hours
              </p>

              <div className="mt-8 grid gap-3 border-t border-border pt-6 text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:grid-cols-2">
                <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" /> 60-day purity guarantee</span>
                <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-accent" /> Free ritual sample included</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="border-t border-border bg-card/50 px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}>
            <p className="text-[10px] uppercase tracking-[0.38em] text-accent">Origin &amp; craft</p>
            <h2 className="mt-4 font-display text-3xl leading-tight md:text-4xl">The story in the jar.</h2>
            {product.story.map((para) => (
              <p key={para.slice(0, 24)} className="mt-5 text-sm leading-7 text-muted-foreground">{para}</p>
            ))}
            <p className="mt-6 border-l-2 border-accent/50 pl-4 text-xs leading-6 text-muted-foreground">
              <span className="text-foreground">Ingredients — </span>{product.ingredients}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1, ease }} className="space-y-4">
            <div className="border border-border bg-background p-7">
              <h3 className="flex items-center gap-3 font-display text-xl"><Leaf className="h-5 w-5 text-accent" /> Why it works</h3>
              <ul className="mt-5 space-y-3">
                {product.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" /> {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-border bg-background p-7">
              <h3 className="flex items-center gap-3 font-display text-xl"><Squirrel className="h-5 w-5 text-accent" /> How to use</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{product.usage}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* RELATED */}
      <section className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-3xl md:text-4xl">Pairs well with.</h2>
            <Link to="/products" className="text-[10px] uppercase tracking-[0.24em] text-accent transition hover:text-foreground">View all</Link>
          </div>
          <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-3">
            {related.map((p, i) => (
              <motion.div key={p.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08, ease }}>
                <Link to="/products/$slug" params={{ slug: p.slug }} className="group block bg-card p-6 transition hover:bg-secondary/60">
                  <div className="mx-auto aspect-square w-32 overflow-hidden rounded-full border border-border bg-secondary p-1">
                    <img src={p.image} alt={p.name} loading="lazy" width={768} height={896} className="h-full w-full rounded-full object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <p className="mt-5 text-[9px] uppercase tracking-[0.2em] text-muted-foreground">{p.category}</p>
                  <h3 className="mt-1 font-display text-lg leading-tight">{p.name}</h3>
                  <p className="mt-3 font-display text-accent">₹ {p.price.toLocaleString("en-IN")}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function ProductMissing() {
  return (
    <div className="paper-home flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center text-foreground">
      <h1 className="font-display text-4xl">This botanical has returned to the forest.</h1>
      <p className="mt-4 text-sm text-muted-foreground">The product you are looking for is no longer part of the apothecary.</p>
      <Link to="/products" className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-[11px] uppercase tracking-[0.25em] transition hover:bg-accent hover:text-accent-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to products
      </Link>
    </div>
  );
}
