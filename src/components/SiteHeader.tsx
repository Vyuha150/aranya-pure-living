import { Link } from "@tanstack/react-router";
import { ShoppingBag, LayoutDashboard } from "lucide-react";
import { AranyaMark } from "./AranyaMark";

const links = [
  { to: "/philosophy", label: "Philosophy" },
  { to: "/products", label: "Products" },
  { to: "/lifestyle", label: "Lifestyle" },
  { to: "/rituals", label: "Rituals" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10 md:py-8">
        <Link to="/" className="flex items-center gap-3 text-cream">
          <AranyaMark size={36} className="text-sand" />
          <span className="font-display text-2xl tracking-[0.18em] uppercase">
            aranya
          </span>
        </Link>
        <nav className="hidden items-center gap-10 text-[13px] tracking-[0.2em] uppercase text-cream/80 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="transition hover:text-cream"
              activeProps={{ className: "text-cream" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <button
          aria-label="Cart"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 bg-cream/5 text-cream/90 backdrop-blur-sm transition hover:bg-cream/15"
        >
          <ShoppingBag className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
