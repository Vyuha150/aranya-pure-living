import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Search, Pencil, Trash2, X } from "lucide-react";
import { type Product, products as seed, formatINR, type ProductCategory, type ProductStatus } from "@/lib/admin-mock";
import { StatusPill } from "./admin.index";

export const Route = createFileRoute("/admin/products")({
  component: ProductsAdmin,
});

const categories: ProductCategory[] = ["Powders", "Premixes", "Tonics", "Tablets", "Snacks", "Gummies"];
const statuses: ProductStatus[] = ["Live", "Draft", "Low stock", "Out of stock"];

function ProductsAdmin() {
  const [list, setList] = useState<Product[]>(seed);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);

  const filtered = useMemo(
    () =>
      list.filter(
        (p) =>
          (cat === "All" || p.category === cat) &&
          (q === "" || p.name.toLowerCase().includes(q.toLowerCase()) || p.sku.toLowerCase().includes(q.toLowerCase()))
      ),
    [list, q, cat]
  );

  const remove = (id: string) => setList((l) => l.filter((p) => p.id !== id));
  const upsert = (p: Product) =>
    setList((l) => (l.some((x) => x.id === p.id) ? l.map((x) => (x.id === p.id ? p : x)) : [p, ...l]));

  return (
    <div className="space-y-6 px-6 py-8 md:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Products</h1>
          <p className="mt-1 text-sm text-cream/55">{list.length} SKUs · {list.filter((p) => p.status === "Live").length} live</p>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="inline-flex items-center gap-2 rounded-md bg-terra px-4 py-2 text-xs uppercase tracking-[0.22em] text-umber transition hover:bg-terra/90"
        >
          <Plus className="h-3.5 w-3.5" /> New product
        </button>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-md border border-cream/10 bg-[#161310] px-3 py-2 text-sm">
          <Search className="h-4 w-4 text-cream/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or SKU…"
            className="flex-1 bg-transparent text-cream outline-none placeholder:text-cream/40"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto">
          {(["All", ...categories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`whitespace-nowrap rounded-md border px-3 py-1.5 text-xs uppercase tracking-[0.2em] ${
                cat === c ? "border-terra/50 bg-terra/15 text-cream" : "border-cream/10 text-cream/55 hover:bg-cream/[0.04]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-lg border border-cream/8 bg-[#161310]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cream/8 text-[10px] uppercase tracking-[0.22em] text-cream/45">
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-left">SKU</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-right">Price</th>
                <th className="px-4 py-3 text-right">Stock</th>
                <th className="px-4 py-3 text-right">Sold 30d</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-cream/5 last:border-0 hover:bg-cream/[0.02]">
                  <td className="px-4 py-3">
                    <div className="text-cream">{p.name}</div>
                    <div className="text-xs text-cream/45">★ {p.rating || "—"}</div>
                  </td>
                  <td className="px-4 py-3 text-cream/65">{p.sku}</td>
                  <td className="px-4 py-3 text-cream/65">{p.category}</td>
                  <td className="px-4 py-3 text-right">{formatINR(p.price)}</td>
                  <td className={`px-4 py-3 text-right ${p.stock === 0 ? "text-rose-300" : p.stock < 50 ? "text-amber-300" : "text-cream/80"}`}>
                    {p.stock}
                  </td>
                  <td className="px-4 py-3 text-right">{p.sold30d}</td>
                  <td className="px-4 py-3"><StatusPill status={p.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => setEditing(p)}
                        className="rounded p-1.5 text-cream/55 hover:bg-cream/10 hover:text-cream"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => remove(p.id)}
                        className="rounded p-1.5 text-cream/55 hover:bg-rose-500/15 hover:text-rose-300"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-sm text-cream/45">
                    No products match these filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {(editing || creating) && (
        <ProductDrawer
          initial={editing}
          onClose={() => {
            setEditing(null);
            setCreating(false);
          }}
          onSave={(p) => {
            upsert(p);
            setEditing(null);
            setCreating(false);
          }}
        />
      )}
    </div>
  );
}

function ProductDrawer({
  initial,
  onSave,
  onClose,
}: {
  initial: Product | null;
  onSave: (p: Product) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Product>(
    initial ?? {
      id: `p_${Math.random().toString(36).slice(2, 7)}`,
      sku: "ARA-NEW-000",
      name: "",
      category: "Powders",
      price: 0,
      cost: 0,
      stock: 0,
      sold30d: 0,
      status: "Draft",
      rating: 0,
      createdAt: new Date().toISOString().slice(0, 10),
    }
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50" onClick={onClose}>
      <div
        className="h-full w-full max-w-md overflow-y-auto border-l border-cream/10 bg-[#161310] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-cream/45">
              {initial ? "Edit" : "Create"}
            </div>
            <h2 className="mt-1 font-display text-2xl">{initial ? form.name || "Product" : "New product"}</h2>
          </div>
          <button onClick={onClose} className="rounded p-2 text-cream/60 hover:bg-cream/10">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 space-y-4 text-sm">
          <Field label="Name">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inp} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="SKU">
              <input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} className={inp} />
            </Field>
            <Field label="Category">
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as ProductCategory })}
                className={inp}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Price ₹">
              <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: +e.target.value })} className={inp} />
            </Field>
            <Field label="Cost ₹">
              <input type="number" value={form.cost} onChange={(e) => setForm({ ...form, cost: +e.target.value })} className={inp} />
            </Field>
            <Field label="Stock">
              <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: +e.target.value })} className={inp} />
            </Field>
          </div>
          <Field label="Status">
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as ProductStatus })}
              className={inp}
            >
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </Field>

          <div className="rounded-md border border-cream/8 bg-cream/[0.02] p-3 text-xs text-cream/55">
            Margin estimate:{" "}
            <span className="text-cream">
              {form.price > 0 ? `${Math.round(((form.price - form.cost) / form.price) * 100)}%` : "—"}
            </span>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={() => onSave(form)}
            className="flex-1 rounded-md bg-terra px-4 py-2.5 text-xs uppercase tracking-[0.22em] text-umber hover:bg-terra/90"
          >
            Save product
          </button>
          <button
            onClick={onClose}
            className="rounded-md border border-cream/15 px-4 py-2.5 text-xs uppercase tracking-[0.22em] text-cream/70 hover:bg-cream/5"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

const inp = "w-full rounded-md border border-cream/10 bg-[#0e0c0a] px-3 py-2 text-cream outline-none focus:border-terra/50";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] uppercase tracking-[0.22em] text-cream/45">{label}</span>
      {children}
    </label>
  );
}
