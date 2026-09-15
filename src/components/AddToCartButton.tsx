import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

type Props = {
  slug: string;
  qty?: number;
  label?: string;
  className?: string;
  openCartOnAdd?: boolean;
};

export function AddToCartButton({ slug, qty = 1, label = "Add to cart", className = "", openCartOnAdd = true }: Props) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        add(slug, qty, { open: openCartOnAdd });
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1400);
      }}
      className={`relative inline-flex items-center justify-center gap-2 overflow-hidden transition ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {added ? (
          <motion.span
            key="added"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="inline-flex items-center gap-2"
          >
            <Check className="h-3.5 w-3.5" /> Added
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="inline-flex items-center gap-2"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> {label}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
