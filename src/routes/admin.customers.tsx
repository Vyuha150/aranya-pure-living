import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Mail, Trash2 } from "lucide-react";
import { customers as seed, formatINR, type Customer } from "@/lib/admin-mock";
import { StatusPill } from "./admin.index";

export const Route = createFileRoute("/admin/customers")({
  component: CustomersAdmin,
});

function CustomersAdmin() {
  const [list, setList] = useState<Customer[]>(seed);
  const [q, setQ] = useState("");
  const [tier, setTier] = useState<string>("All");
  const [selected, setSelected] = useState<Customer | null>(null);

  const filtered = useMemo(
    () =>
      list.filter(
        (c) =>
          (tier === "All" || c.tier === tier) &&
          (q === "" || c.name.toLowerCase().includes(q.toLowerCase()) || c.email.toLowerCase().includes(q.toLowerCase()))
      ),
    [list, q, tier]
  );

  const totalLtv = filtered.reduce((s, c) => s + c.ltv, 0);

  return (
    <div className="space-y-6 px-6 py-8 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Customers</h1>
          <p className="mt-1 text-sm text-cream/55">
            {filtered.length} people · {formatINR(totalLtv)} lifetime value
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-md border border-cream/10 bg-[#161310] px-3 py-2 text-sm">
          <Search className="h-4 w-4 text-cream/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name or email…"
            className="flex-1 bg-transparent text-cream outline-none placeholder:text-cream/40"
          />
        </div>
        <div className="flex gap-1.5">
          {["All", "VIP", "Returning", "New"].map((t) => (
            <button
              key={t}
              onClick={() => setTier(t)}
              className={`rounded-md border px-3 py-1.5 text-xs uppercase tracking-[0.2em] ${
                tier === t ? "border-terra/50 bg-terra/15 text-cream" : "border-cream/10 text-cream/55 hover:bg-cream/[0.04]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="overflow-hidden rounded-lg border border-cream/8 bg-[#161310]">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cream/8 text-[10px] uppercase tracking-[0.22em] text-cream/45">
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-left">City</th>
                  <th className="px-4 py-3 text-left">Tier</th>
                  <th className="px-4 py-3 text-right">Orders</th>
                  <th className="px-4 py-3 text-right">LTV</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setSelected(c)}
                    className={`cursor-pointer border-b border-cream/5 last:border-0 hover:bg-cream/[0.02] ${
                      selected?.id === c.id ? "bg-terra/[0.06]" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="text-cream">{c.name}</div>
                      <div className="text-xs text-cream/45">{c.email}</div>
                    </td>
                    <td className="px-4 py-3 text-cream/65">{c.city}</td>
                    <td className="px-4 py-3"><StatusPill status={c.tier} /></td>
                    <td className="px-4 py-3 text-right">{c.orders}</td>
                    <td className="px-4 py-3 text-right">{formatINR(c.ltv)}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setList((l) => l.filter((x) => x.id !== c.id));
                          if (selected?.id === c.id) setSelected(null);
                        }}
                        className="rounded p-1.5 text-cream/55 hover:bg-rose-500/15 hover:text-rose-300"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* DETAIL */}
        <div className="rounded-lg border border-cream/8 bg-[#161310] p-6">
          {selected ? (
            <>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-cream/45">Customer</div>
                  <h2 className="mt-1 font-display text-2xl">{selected.name}</h2>
                  <div className="mt-1 text-sm text-cream/55">{selected.email}</div>
                </div>
                <StatusPill status={selected.tier} />
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <Stat label="Orders" value={String(selected.orders)} />
                <Stat label="LTV" value={formatINR(selected.ltv)} />
                <Stat label="AOV" value={formatINR(selected.ltv / Math.max(1, selected.orders))} />
              </div>

              <div className="mt-6 space-y-2 text-sm">
                <Row k="City" v={selected.city} />
                <Row k="Last order" v={selected.lastOrder} />
                <Row k="Email opt-in" v="Yes — Dispatches" />
                <Row k="Default channel" v="Web" />
              </div>

              <div className="mt-6 flex gap-2">
                <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-terra px-4 py-2 text-xs uppercase tracking-[0.22em] text-umber hover:bg-terra/90">
                  <Mail className="h-3.5 w-3.5" /> Send dispatch
                </button>
                <button className="rounded-md border border-cream/15 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cream/70 hover:bg-cream/5">
                  Open profile
                </button>
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-center text-sm text-cream/45">
              Select a customer to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-cream/8 bg-cream/[0.02] py-3">
      <div className="text-[10px] uppercase tracking-[0.22em] text-cream/45">{label}</div>
      <div className="mt-1 font-display text-lg text-cream">{value}</div>
    </div>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-cream/8 pb-1.5 text-sm">
      <span className="text-cream/50">{k}</span>
      <span className="text-cream/85">{v}</span>
    </div>
  );
}
