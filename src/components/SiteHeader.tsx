import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { AranyaMark } from "./AranyaMark";

const links = [
  { to: "/", label: "Philosophy" },
  { to: "/", label: "Catalog" },
  { to: "/", label: "Rituals" },
  { to: "/", label: "Journal" },
];

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
            <a key={l.label} href="#" className="transition hover:text-cream">
              {l.label}
            </a>
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
