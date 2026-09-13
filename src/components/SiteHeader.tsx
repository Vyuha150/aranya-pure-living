import { Link } from "@tanstack/react-router";
import { ShoppingBag, LayoutDashboard } from "lucide-react";
import aranyaLogo from "@/assets/aranya-logo.jpg";

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
  relative?: boolean;
};

export function SiteHeader({ immersive = false, relative = false }: SiteHeaderProps) {
  return (
    <header className={`${relative ? "relative" : "absolute inset-x-0 top-0"} z-30 border-b border-cream/15 bg-transparent`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 md:py-5">
        <Link to="/" className="flex items-center text-cream">
          <img
            src={aranyaLogo}
            alt="Aranya"
            className="h-10 w-auto object-contain md:h-12"
            width={140}
            height={48}
          />
        </Link>
        <nav className="hidden items-center gap-8 text-[11px] tracking-[0.2em] uppercase text-cream/70 md:flex">
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
            aria-label="Cart"
            className={`flex h-10 w-10 items-center justify-center border border-sand/35 text-cream/80 transition hover:bg-walnut ${immersive ? "bg-background/20 backdrop-blur-sm" : "bg-umber"}`}
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
