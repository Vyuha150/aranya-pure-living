import { useNavigate } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";

type Props = {
  slug: string;
  qty?: number;
  label?: string;
  className?: string;
};

export function BuyNowButton({ slug, qty = 1, label = "Buy now", className = "" }: Props) {
  const { add } = useCart();
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        add(slug, qty, { open: false });
        void navigate({ to: "/checkout" });
      }}
      className={`inline-flex items-center justify-center gap-2 ${className}`}
    >
      {label}
    </button>
  );
}
