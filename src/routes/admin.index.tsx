import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowDownRight, ArrowUpRight, Eye, Package, ShoppingBag, Users } from "lucide-react";
import {
  formatINR,
  orders,
  products,
  revenueSeries,
  trafficByChannel,
} from "@/lib/admin-mock";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const palette = ["#c9794a", "#d9a86a", "#8b6f5e", "#5e4a3c", "#2d2520"];

function Kpi({
  label,
  value,
  delta,
  icon: Icon,
  positive = true,
}: {
  label: string;
  value: string;
  delta: string;
  icon: any;
  positive?: boolean;
}) {
  return (
    <div className="rounded-lg border border-cream/8 bg-[#161310] p-5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.28em] text-cream/45">{label}</span>
        <Icon className="h-4 w-4 text-terra/80" />
      </div>
      <div className="mt-4 font-display text-3xl">{value}</div>
      <div
        className={`mt-2 inline-flex items-center gap-1 text-xs ${
          positive ? "text-emerald-400/90" : "text-rose-400/90"
        }`}
      >
        {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
        {delta}
        <span className="text-cream/40">vs last 14d</span>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const totalRevenue = revenueSeries.reduce((s, d) => s + d.revenue, 0);
  const totalOrders = revenueSeries.reduce((s, d) => s + d.orders, 0);
  const aov = totalRevenue / totalOrders;
  const topProducts = [...products].sort((a, b) => b.sold30d - a.sold30d).slice(0, 5);

  return (
    <div className="space-y-8 px-6 py-8 md:px-10">
      {/* HEADER */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl">Good morning, Studio.</h1>
          <p className="mt-1 text-sm text-cream/55">
            Last 14 days · Founders' Edition window · IST
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          {["7D", "14D", "30D", "QTD"].map((p, i) => (
            <button
              key={p}
              className={`rounded-md border px-3 py-1.5 uppercase tracking-[0.2em] ${
                i === 1
                  ? "border-terra/50 bg-terra/15 text-cream"
                  : "border-cream/10 text-cream/55 hover:bg-cream/[0.04]"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI ROW */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label="Revenue" value={formatINR(totalRevenue)} delta="+18.4%" icon={ShoppingBag} />
        <Kpi label="Orders" value={String(totalOrders)} delta="+12.1%" icon={Package} />
        <Kpi label="Avg order value" value={formatINR(aov)} delta="+5.6%" icon={ArrowUpRight} />
        <Kpi label="Active customers" value="1,284" delta="-1.8%" icon={Users} positive={false} />
      </div>

      {/* REVENUE CHART */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-lg border border-cream/8 bg-[#161310] p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-cream/45">Revenue trend</div>
              <div className="mt-1 font-display text-xl">Daily flow</div>
            </div>
            <div className="flex gap-3 text-xs text-cream/60">
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-terra" />Revenue</span>
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-gold" />Orders</span>
            </div>
          </div>
          <div className="mt-4 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueSeries}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c9794a" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#c9794a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="d" stroke="#ffffff55" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff55" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ background: "#1c1815", border: "1px solid #ffffff15", borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: "#fff8eb" }}
                  formatter={(v: number) => formatINR(v)}
                />
                <Area type="monotone" dataKey="revenue" stroke="#c9794a" strokeWidth={2} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border border-cream/8 bg-[#161310] p-5">
          <div className="text-[10px] uppercase tracking-[0.28em] text-cream/45">Traffic source</div>
          <div className="mt-1 font-display text-xl">Where they came from</div>
          <div className="mt-2 h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={trafficByChannel} dataKey="visits" nameKey="channel" innerRadius={50} outerRadius={80} stroke="none">
                  {trafficByChannel.map((_, i) => (
                    <Cell key={i} fill={palette[i % palette.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#1c1815", border: "1px solid #ffffff15", borderRadius: 8, fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 space-y-1.5 text-xs">
            {trafficByChannel.map((t, i) => (
              <li key={t.channel} className="flex items-center justify-between text-cream/65">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: palette[i] }} />
                  {t.channel}
                </span>
                <span>{t.visits.toLocaleString()} · {t.share}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* TOP PRODUCTS + RECENT ORDERS */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-lg border border-cream/8 bg-[#161310] p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-cream/45">Best sellers · 30d</div>
              <div className="mt-1 font-display text-xl">Top moving SKUs</div>
            </div>
            <Link to="/admin/products" className="text-xs uppercase tracking-[0.2em] text-terra hover:text-terra/80">
              All products →
            </Link>
          </div>
          <div className="mt-4 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid stroke="#ffffff10" horizontal={false} />
                <XAxis type="number" stroke="#ffffff55" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" stroke="#ffffff55" fontSize={11} width={170} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: "#1c1815", border: "1px solid #ffffff15", borderRadius: 8, fontSize: 12 }}
                />
                <Bar dataKey="sold30d" fill="#c9794a" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border border-cream/8 bg-[#161310] p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-cream/45">Live</div>
              <div className="mt-1 font-display text-xl">Recent orders</div>
            </div>
            <Link to="/admin/orders" className="text-xs uppercase tracking-[0.2em] text-terra hover:text-terra/80">
              All →
            </Link>
          </div>
          <ul className="mt-4 space-y-3">
            {orders.slice(0, 6).map((o) => (
              <li key={o.id} className="flex items-center justify-between border-b border-cream/8 pb-3 text-sm last:border-0">
                <div>
                  <div className="text-cream">{o.customer}</div>
                  <div className="text-xs text-cream/45">{o.id} · {o.city}</div>
                </div>
                <div className="text-right">
                  <div className="text-cream">{formatINR(o.total)}</div>
                  <StatusPill status={o.status} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ALERTS */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { title: "2 SKUs out of stock", body: "Brahmi Stillness Tablet, Curcumin Forte (draft).", tone: "rose" },
          { title: "3 SKUs low on stock", body: "Ashwagandha Oil, Shatavari Powder, Makhana Snack.", tone: "amber" },
          { title: "1 wholesale renewal", body: "Verdant Cafés contract renews on May 28.", tone: "emerald" },
        ].map((a) => (
          <div key={a.title} className="rounded-lg border border-cream/8 bg-[#161310] p-5">
            <div className={`text-[10px] uppercase tracking-[0.28em] ${a.tone === "rose" ? "text-rose-400/90" : a.tone === "amber" ? "text-amber-300/90" : "text-emerald-300/90"}`}>
              Attention
            </div>
            <div className="mt-2 font-display text-lg">{a.title}</div>
            <p className="mt-1 text-sm text-cream/55">{a.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Paid: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
    Processing: "bg-amber-500/15 text-amber-300 border-amber-500/20",
    Shipped: "bg-sky-500/15 text-sky-300 border-sky-500/20",
    Delivered: "bg-cream/10 text-cream/70 border-cream/15",
    Refunded: "bg-rose-500/15 text-rose-300 border-rose-500/20",
    Live: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
    Draft: "bg-cream/10 text-cream/60 border-cream/15",
    "Low stock": "bg-amber-500/15 text-amber-300 border-amber-500/20",
    "Out of stock": "bg-rose-500/15 text-rose-300 border-rose-500/20",
    Published: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
    VIP: "bg-terra/20 text-terra border-terra/30",
    Returning: "bg-sky-500/15 text-sky-300 border-sky-500/20",
    New: "bg-cream/10 text-cream/70 border-cream/15",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] ${map[status] ?? "bg-cream/10 text-cream/70 border-cream/15"}`}>
      {status}
    </span>
  );
}
