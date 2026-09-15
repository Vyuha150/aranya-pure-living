import { Link } from "@tanstack/react-router";
import { ShoppingBag, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";
import aranyaLogo from "@/assets/aranya-logo-gold.png";
import { useCart } from "@/lib/cart";

const links = [
  { to: "/philosophy", label: "Philosophy" },
  { to: "/products", label: "Products" },
  { to: "/lifestyle", label: "Lifestyle" },
  { to: "/rituals", label: "Rituals" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

type SiteHeaderProps = {
  immersive?: boolean;
};

export function SiteHeader({ immersive = false }: SiteHeaderProps) {
  const { count, openCart } = useCart();

  return (
    <header className="absolute inset-x-0 top-0 z-30 border-b border-cream/15 bg-transparent">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-10 md:py-4">
        <Link to="/" className="group flex items-center text-cream">
          <img
            src={aranyaLogo}
            alt="Aranya — Truly Natural"
            className="h-16 w-auto object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)] transition duration-500 group-hover:scale-[1.03] md:h-20"
            width={664}
            height={874}
          />
        </Link>
        <nav className="hidden items-center gap-8 text-[11px] tracking-[0.2em] uppercase text-black md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="transition hover:text-black/70"
              activeProps={{ className: "text-black" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/admin"
            aria-label="Admin Panel"
            title="Admin Panel"
            className={`flex h-10 w-10 items-center justify-center border border-sand/35 text-cream/80 transition hover:bg-walnut ${immersive ? "bg-background/20 backdrop-blur-sm" : "bg-umber"}`}
          >
            <LayoutDashboard className="h-4 w-4" />
          </Link>
          <button
            aria-label={`Cart (${count} items)`}
            onClick={openCart}
            className={`relative flex h-10 w-10 items-center justify-center border border-sand/35 text-cream/80 transition hover:bg-walnut ${immersive ? "bg-background/20 backdrop-blur-sm" : "bg-umber"}`}
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-terra px-1 text-[10px] text-umber"
              >
                {count}
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
