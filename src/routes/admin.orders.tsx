import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, MoreHorizontal } from "lucide-react";
import { orders as seed, formatINR, type Order, type OrderStatus } from "@/lib/admin-mock";
import { StatusPill } from "./admin.index";

export const Route = createFileRoute("/admin/orders")({
  component: OrdersAdmin,
});

const statuses: (OrderStatus | "All")[] = ["All", "Paid", "Processing", "Shipped", "Delivered", "Refunded"];

function OrdersAdmin() {
  const [list, setList] = useState<Order[]>(seed);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<(typeof statuses)[number]>("All");

  const filtered = useMemo(
    () =>
      list.filter(
        (o) =>
          (status === "All" || o.status === status) &&
          (q === "" ||
            o.id.toLowerCase().includes(q.toLowerCase()) ||
            o.customer.toLowerCase().includes(q.toLowerCase()))
      ),
    [list, q, status]
  );

  const totalRevenue = filtered.reduce((s, o) => s + (o.status === "Refunded" ? 0 : o.total), 0);

  const advance = (id: string) => {
    const flow: OrderStatus[] = ["Paid", "Processing", "Shipped", "Delivered"];
    setList((l) =>
      l.map((o) => {
        if (o.id !== id) return o;
        const i = flow.indexOf(o.status);
        if (i === -1 || i === flow.length - 1) return o;
        return { ...o, status: flow[i + 1] };
      })
    );
  };

  const refund = (id: string) =>
    setList((l) => l.map((o) => (o.id === id ? { ...o, status: "Refunded" as OrderStatus } : o)));

  return (
    <div className="space-y-6 px-6 py-8 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Orders</h1>
          <p className="mt-1 text-sm text-cream/55">
            {filtered.length} matching · {formatINR(totalRevenue)} net
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-md border border-cream/10 bg-[#161310] px-3 py-2 text-sm">
          <Search className="h-4 w-4 text-cream/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search order ID or customer…"
            className="flex-1 bg-transparent text-cream outline-none placeholder:text-cream/40"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`whitespace-nowrap rounded-md border px-3 py-1.5 text-xs uppercase tracking-[0.2em] ${
                status === s ? "border-terra/50 bg-terra/15 text-cream" : "border-cream/10 text-cream/55 hover:bg-cream/[0.04]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-cream/8 bg-[#161310]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cream/8 text-[10px] uppercase tracking-[0.22em] text-cream/45">
                <th className="px-4 py-3 text-left">Order</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Channel</th>
                <th className="px-4 py-3 text-left">City</th>
                <th className="px-4 py-3 text-right">Items</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-cream/5 last:border-0 hover:bg-cream/[0.02]">
                  <td className="px-4 py-3 font-mono text-cream/85">{o.id}</td>
                  <td className="px-4 py-3">
                    <div className="text-cream">{o.customer}</div>
                    <div className="text-xs text-cream/45">{o.email}</div>
                  </td>
                  <td className="px-4 py-3 text-cream/65">{o.channel}</td>
                  <td className="px-4 py-3 text-cream/65">{o.city}</td>
                  <td className="px-4 py-3 text-right">{o.items}</td>
                  <td className="px-4 py-3 text-right">{formatINR(o.total)}</td>
                  <td className="px-4 py-3"><StatusPill status={o.status} /></td>
                  <td className="px-4 py-3 text-cream/55">{o.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2 text-[10px] uppercase tracking-[0.2em]">
                      {o.status !== "Delivered" && o.status !== "Refunded" && (
                        <button
                          onClick={() => advance(o.id)}
                          className="rounded border border-cream/15 px-2 py-1 text-cream/70 hover:bg-cream/5"
                        >
                          Advance
                        </button>
                      )}
                      {o.status !== "Refunded" && (
                        <button
                          onClick={() => refund(o.id)}
                          className="rounded border border-rose-500/30 px-2 py-1 text-rose-300/90 hover:bg-rose-500/10"
                        >
                          Refund
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
