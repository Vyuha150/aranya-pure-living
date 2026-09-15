import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { formatINR, freeShippingThreshold, useCart } from "@/lib/cart";

const ease = [0.22, 1, 0.36, 1] as const;

export function CartDrawer() {
  const { isOpen, closeCart, entries, subtotal, savings, shipping, total, setQty, remove, count } = useCart();
  const remaining = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70]">
          <motion.button
            aria-label="Close cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="absolute inset-0 h-full w-full cursor-default bg-black/55 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-sand/20 bg-umber text-cream shadow-2xl"
            role="dialog"
            aria-label="Shopping cart"
          >
            <header className="flex items-center justify-between border-b border-cream/12 px-6 py-5">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-4 w-4 text-sand" />
                <span className="text-[11px] uppercase tracking-[0.28em] text-cream/70">
                  Your ritual · {count} {count === 1 ? "item" : "items"}
                </span>
              </div>
              <button onClick={closeCart} aria-label="Close cart" className="text-cream/60 transition hover:text-cream">
                <X className="h-4 w-4" />
              </button>
            </header>

            {entries.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <ShoppingBag className="h-10 w-10 text-sand/50" strokeWidth={1} />
                <p className="font-display text-2xl">Your cart is empty.</p>
                <p className="text-sm text-cream/60">Begin with a single-origin botanical.</p>
                <Link
                  to="/products"
                  onClick={closeCart}
                  className="mt-2 rounded-full bg-sand px-7 py-3 text-[11px] uppercase tracking-[0.24em] text-umber transition hover:bg-terra"
                >
                  Browse the apothecary
                </Link>
              </div>
            ) : (
              <>
                <div className="border-b border-cream/10 px-6 py-3 text-[10px] uppercase tracking-[0.22em] text-cream/60">
                  {remaining > 0 ? `${formatINR(remaining)} away from free shipping` : "Free shipping unlocked"}
                  <div className="mt-2 h-px w-full bg-cream/10">
                    <motion.div
                      className="h-px bg-sand"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                      transition={{ duration: 0.6, ease }}
                    />
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4">
                  <AnimatePresence initial={false}>
                    {entries.map((entry) => (
                      <motion.div
                        key={entry.product.slug}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.35, ease }}
                        className="flex gap-4 border-b border-cream/8 py-4 last:border-b-0"
                      >
                        <Link to="/products/$slug" params={{ slug: entry.product.slug }} onClick={closeCart} className="shrink-0">
                          <img
                            src={entry.product.image}
                            alt={entry.product.name}
                            className="h-20 w-20 rounded-full border border-cream/15 object-cover"
                          />
                        </Link>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <Link
                                to="/products/$slug"
                                params={{ slug: entry.product.slug }}
                                onClick={closeCart}
                                className="block truncate font-display text-lg leading-tight hover:text-sand"
                              >
                                {entry.product.name}
                              </Link>
                              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-cream/45">{entry.product.type}</p>
                            </div>
                            <button
                              onClick={() => remove(entry.product.slug)}
                              aria-label={`Remove ${entry.product.name}`}
                              className="text-cream/40 transition hover:text-terra"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-3 rounded-full border border-cream/15 px-2 py-1">
                              <button
                                onClick={() => setQty(entry.product.slug, entry.qty - 1)}
                                aria-label="Decrease quantity"
                                className="text-cream/70 transition hover:text-sand"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="min-w-4 text-center text-xs">{entry.qty}</span>
                              <button
                                onClick={() => setQty(entry.product.slug, entry.qty + 1)}
                                aria-label="Increase quantity"
                                className="text-cream/70 transition hover:text-sand"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <span className="font-display text-base text-sand">{formatINR(entry.lineTotal)}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <footer className="border-t border-cream/12 px-6 py-5">
                  <div className="space-y-2 text-xs text-cream/65">
                    <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
                    {savings > 0 && (
                      <div className="flex justify-between text-terra"><span>Founders' saving</span><span>−{formatINR(savings)}</span></div>
                    )}
                    <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "Free" : formatINR(shipping)}</span></div>
                  </div>
                  <div className="mt-4 flex items-end justify-between border-t border-cream/10 pt-4">
                    <span className="text-[11px] uppercase tracking-[0.24em] text-cream/60">Total</span>
                    <span className="font-display text-2xl text-sand">{formatINR(total)}</span>
                  </div>
                  <Link
                    to="/checkout"
                    onClick={closeCart}
                    className="mt-5 flex w-full items-center justify-center rounded-full bg-sand px-6 py-4 text-[11px] uppercase tracking-[0.26em] text-umber transition hover:bg-terra"
                  >
                    Proceed to checkout
                  </Link>
                  <button
                    onClick={closeCart}
                    className="mt-3 w-full text-center text-[10px] uppercase tracking-[0.22em] text-cream/50 transition hover:text-cream"
                  >
                    Continue shopping
                  </button>
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
