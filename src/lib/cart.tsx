import * as React from "react";
import { catalog, getProduct, type CatalogProduct } from "@/lib/catalog";

export type CartLine = { slug: string; qty: number };
export type CartEntry = { product: CatalogProduct; qty: number; lineTotal: number };

type CartContextValue = {
  lines: CartLine[];
  entries: CartEntry[];
  count: number;
  subtotal: number;
  savings: number;
  shipping: number;
  total: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (slug: string, qty?: number, options?: { open?: boolean }) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "aranya-cart-v1";
const FREE_SHIPPING_THRESHOLD = 1500;
const SHIPPING_FEE = 99;

const CartContext = React.createContext<CartContextValue | null>(null);

function readStored(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((l) => l && typeof l.slug === "string" && getProduct(l.slug))
      .map((l) => ({ slug: l.slug, qty: Math.max(1, Math.min(99, Number(l.qty) || 1)) }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = React.useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setLines(readStored());
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  const add = React.useCallback((slug: string, qty = 1, options?: { open?: boolean }) => {
    if (!getProduct(slug)) return;
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === slug);
      if (existing) {
        return prev.map((l) => (l.slug === slug ? { ...l, qty: Math.min(99, l.qty + qty) } : l));
      }
      return [...prev, { slug, qty: Math.min(99, qty) }];
    });
    if (options?.open !== false) setIsOpen(true);
  }, []);

  const setQty = React.useCallback((slug: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) => (l.slug === slug ? { ...l, qty: Math.min(99, qty) } : l)),
    );
  }, []);

  const remove = React.useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const clear = React.useCallback(() => setLines([]), []);

  const value = React.useMemo<CartContextValue>(() => {
    const entries: CartEntry[] = lines.flatMap((line) => {
      const product = catalog.find((p) => p.slug === line.slug);
      return product ? [{ product, qty: line.qty, lineTotal: product.price * line.qty }] : [];
    });
    const subtotal = entries.reduce((sum, e) => sum + e.lineTotal, 0);
    const savings = entries.reduce((sum, e) => sum + (e.product.was ? (e.product.was - e.product.price) * e.qty : 0), 0);
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
    return {
      lines,
      entries,
      count: entries.reduce((sum, e) => sum + e.qty, 0),
      subtotal,
      savings,
      shipping,
      total: subtotal + shipping,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      add,
      setQty,
      remove,
      clear,
    };
  }, [lines, isOpen, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export const freeShippingThreshold = FREE_SHIPPING_THRESHOLD;
export const formatINR = (value: number) => `₹ ${value.toLocaleString("en-IN")}`;
