import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, CreditCard, Leaf, Lock, ShieldCheck, Truck } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { formatINR, useCart } from "@/lib/cart";

const ease = [0.22, 1, 0.36, 1] as const;

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Aranya Apothecary" },
      { name: "description", content: "Complete your Aranya order — single-origin botanicals, hand-packed and shipped with a free ritual sample." },
      { property: "og:title", content: "Checkout — Aranya Apothecary" },
      { property: "og:description", content: "Secure checkout for certified-pure Aranya botanicals." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { entries, subtotal, savings, shipping, total, clear, count } = useCart();
  const [placed, setPlaced] = useState<{ id: string; total: number } | null>(null);
  const [payment, setPayment] = useState("card");

  function placeOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const id = `ARN-${Math.floor(100000 + Math.random() * 899999)}`;
    setPlaced({ id, total });
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="paper-home min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="px-6 pb-24 pt-32 md:px-10 md:pt-40">
        <div className="mx-auto max-w-6xl">
          <Link to="/products" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-muted-foreground transition hover:text-accent">
            <ArrowLeft className="h-3.5 w-3.5" /> Continue shopping
          </Link>

          <AnimatePresence mode="wait">
            {placed ? (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease }}
                className="mx-auto mt-16 max-w-2xl border border-border bg-card/60 p-10 text-center md:p-14"
              >
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1, ease }}
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-secondary"
                >
                  <Check className="h-7 w-7 text-accent" />
                </motion.div>
                <h1 className="mt-7 font-display text-4xl md:text-5xl">Your ritual is on its way.</h1>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Order <span className="text-foreground">{placed.id}</span> is confirmed for {formatINR(placed.total)}. A hand-numbered card and a free ritual sample travel with every parcel. You'll receive tracking within 24 hours.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link to="/products" className="rounded-full bg-foreground px-7 py-3.5 text-[11px] uppercase tracking-[0.24em] text-background transition hover:bg-accent hover:text-accent-foreground">
                    Keep exploring
                  </Link>
                  <Link to="/rituals" className="rounded-full border border-border px-7 py-3.5 text-[11px] uppercase tracking-[0.24em] text-muted-foreground transition hover:text-accent">
                    Build your ritual
                  </Link>
                </div>
              </motion.div>
            ) : entries.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto mt-20 max-w-xl text-center">
                <Leaf className="mx-auto h-10 w-10 text-accent" strokeWidth={1} />
                <h1 className="mt-6 font-display text-4xl">Your cart is empty.</h1>
                <p className="mt-4 text-sm text-muted-foreground">Add a botanical to begin your checkout.</p>
                <Link to="/products" className="mt-8 inline-flex rounded-full bg-foreground px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-background transition hover:bg-accent hover:text-accent-foreground">
                  Browse the apothecary
                </Link>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="mt-10">
                <h1 className="font-display text-5xl leading-[1.02] md:text-6xl">Checkout</h1>
                <p className="mt-3 text-sm text-muted-foreground">{count} {count === 1 ? "item" : "items"} · hand-packed within 48 hours of your order.</p>

                <div className="mt-12 grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
                  <form onSubmit={placeOrder} className="space-y-10">
                    <fieldset>
                      <legend className="text-[10px] uppercase tracking-[0.3em] text-accent">01 · Contact</legend>
                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <Field label="Full name" name="name" placeholder="Ananya Rao" required />
                        <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
                        <Field label="Phone" name="phone" type="tel" placeholder="+91 98XXX XXXXX" required />
                      </div>
                    </fieldset>

                    <fieldset>
                      <legend className="text-[10px] uppercase tracking-[0.3em] text-accent">02 · Shipping address</legend>
                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2"><Field label="Address" name="address" placeholder="Flat, street, landmark" required /></div>
                        <Field label="City" name="city" placeholder="Bengaluru" required />
                        <Field label="State" name="state" placeholder="Karnataka" required />
                        <Field label="PIN code" name="pin" placeholder="560001" required />
                        <Field label="Country" name="country" placeholder="India" defaultValue="India" required />
                      </div>
                    </fieldset>

                    <fieldset>
                      <legend className="text-[10px] uppercase tracking-[0.3em] text-accent">03 · Payment</legend>
                      <div className="mt-5 grid gap-3 sm:grid-cols-3">
                        {[
                          { id: "card", label: "Card" },
                          { id: "upi", label: "UPI" },
                          { id: "cod", label: "Cash on delivery" },
                        ].map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => setPayment(option.id)}
                            className={`rounded-sm border px-4 py-3 text-[10px] uppercase tracking-[0.2em] transition ${
                              payment === option.id ? "border-accent bg-secondary text-foreground" : "border-border text-muted-foreground hover:border-accent/50"
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>

                      <AnimatePresence mode="wait">
                        {payment === "card" && (
                          <motion.div key="card" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35, ease }} className="overflow-hidden">
                            <div className="mt-5 grid gap-4 sm:grid-cols-2">
                              <div className="sm:col-span-2"><Field label="Card number" name="card" placeholder="4242 4242 4242 4242" required /></div>
                              <Field label="Expiry" name="expiry" placeholder="MM / YY" required />
                              <Field label="CVC" name="cvc" placeholder="123" required />
                            </div>
                          </motion.div>
                        )}
                        {payment === "upi" && (
                          <motion.div key="upi" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35, ease }} className="overflow-hidden">
                            <div className="mt-5"><Field label="UPI ID" name="upi" placeholder="name@bank" required /></div>
                          </motion.div>
                        )}
                        {payment === "cod" && (
                          <motion.p key="cod" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-5 text-xs leading-6 text-muted-foreground">
                            Pay the courier on delivery. Cash-on-delivery is available across India for orders under ₹ 10,000.
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </fieldset>

                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-foreground px-8 py-4 text-[11px] uppercase tracking-[0.26em] text-background transition hover:bg-accent hover:text-accent-foreground"
                    >
                      <Lock className="h-4 w-4" /> Place order · {formatINR(total)}
                    </button>
                    <p className="text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Demo checkout — no real payment is taken.</p>
                  </form>

                  <aside className="h-fit border border-border bg-card/50 p-7 lg:sticky lg:top-28">
                    <h2 className="font-display text-2xl">Order summary</h2>
                    <div className="mt-6 space-y-5">
                      {entries.map((entry) => (
                        <div key={entry.product.slug} className="flex items-center gap-4">
                          <img src={entry.product.image} alt={entry.product.name} className="h-16 w-16 rounded-full border border-border object-cover" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-display text-base">{entry.product.name}</p>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Qty {entry.qty}</p>
                          </div>
                          <span className="text-sm text-accent">{formatINR(entry.lineTotal)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-7 space-y-2 border-t border-border pt-5 text-xs text-muted-foreground">
                      <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
                      {savings > 0 && <div className="flex justify-between text-accent"><span>Founders' saving</span><span>−{formatINR(savings)}</span></div>}
                      <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "Free" : formatINR(shipping)}</span></div>
                    </div>
                    <div className="mt-5 flex items-end justify-between border-t border-border pt-5">
                      <span className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">Total</span>
                      <span className="font-display text-3xl text-accent">{formatINR(total)}</span>
                    </div>
                    <div className="mt-7 grid gap-3 border-t border-border pt-5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" /> 60-day purity guarantee</span>
                      <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-accent" /> Free shipping over ₹ 1,500</span>
                      <span className="flex items-center gap-2"><CreditCard className="h-4 w-4 text-accent" /> Secure encrypted payment</span>
                    </div>
                  </aside>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Field({ label, name, ...rest }: { label: string; name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      <input
        name={name}
        {...rest}
        className="mt-2 w-full border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:border-accent"
      />
    </label>
  );
}
