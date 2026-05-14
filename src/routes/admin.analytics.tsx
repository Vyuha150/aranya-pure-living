import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cohortRetention, formatINR, products, revenueSeries, sitePages, trafficByChannel } from "@/lib/admin-mock";

export const Route = createFileRoute("/admin/analytics")({
  component: AnalyticsAdmin,
});

const palette = ["#c9794a", "#d9a86a", "#8b6f5e", "#5e4a3c", "#2d2520"];

function AnalyticsAdmin() {
  const productMix = [...products]
    .filter((p) => p.sold30d > 0)
    .map((p) => ({ name: p.name.split(" ")[0], revenue: p.sold30d * p.price }));

  return (
    <div className="space-y-8 px-6 py-8 md:px-10">
      <div>
        <h1 className="font-display text-3xl">Analytics</h1>
        <p className="mt-1 text-sm text-cream/55">Revenue, retention, page traffic and product velocity.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue + Orders dual */}
        <Card title="Revenue vs orders" sub="Daily, 14d">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={revenueSeries}>
              <CartesianGrid stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="d" stroke="#ffffff55" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis yAxisId="r" stroke="#ffffff55" fontSize={11} tickFormatter={(v) => `₹${v / 1000}k`} tickLine={false} axisLine={false} />
              <YAxis yAxisId="o" orientation="right" stroke="#ffffff55" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltip} />
              <Line yAxisId="r" type="monotone" dataKey="revenue" stroke="#c9794a" strokeWidth={2} dot={false} />
              <Line yAxisId="o" type="monotone" dataKey="orders" stroke="#d9a86a" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Traffic */}
        <Card title="Traffic by source" sub="Last 30 days">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={trafficByChannel} dataKey="visits" nameKey="channel" innerRadius={60} outerRadius={100} stroke="none">
                {trafficByChannel.map((_, i) => (
                  <Cell key={i} fill={palette[i % palette.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltip} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#fff8eb99" }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Product revenue mix */}
        <Card title="Revenue by product" sub="30 day window">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={productMix}>
              <CartesianGrid stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="name" stroke="#ffffff55" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#ffffff55" fontSize={11} tickFormatter={(v) => `₹${v / 1000}k`} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltip} formatter={(v: number) => formatINR(v)} />
              <Bar dataKey="revenue" fill="#c9794a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Cohort retention */}
        <Card title="Cohort retention" sub="% returning by month">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.2em] text-cream/45">
                  <th className="px-2 py-2 text-left">Cohort</th>
                  {["M0", "M1", "M2", "M3"].map((h) => (
                    <th key={h} className="px-2 py-2 text-right">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cohortRetention.map((c) => (
                  <tr key={c.cohort} className="border-t border-cream/8">
                    <td className="px-2 py-2 text-cream/70">{c.cohort}</td>
                    {[c.m0, c.m1, c.m2, c.m3].map((v, i) => (
                      <td key={i} className="px-2 py-2 text-right">
                        <div
                          className="inline-block rounded px-2 py-1 text-cream"
                          style={{
                            background: v ? `rgba(201, 121, 74, ${0.1 + (v / 100) * 0.6})` : "transparent",
                            opacity: v ? 1 : 0.3,
                          }}
                        >
                          {v ? `${v}%` : "—"}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* PAGE-LEVEL ANALYTICS */}
      <Card title="Page performance" sub="Across the public website">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cream/8 text-[10px] uppercase tracking-[0.22em] text-cream/45">
                <th className="px-4 py-3 text-left">Page</th>
                <th className="px-4 py-3 text-left">Slug</th>
                <th className="px-4 py-3 text-right">Views 30d</th>
                <th className="px-4 py-3 text-right">Avg time</th>
                <th className="px-4 py-3 text-right">Bounce</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {sitePages.map((p) => (
                <tr key={p.slug} className="border-b border-cream/5 last:border-0">
                  <td className="px-4 py-3 text-cream">{p.title}</td>
                  <td className="px-4 py-3 font-mono text-xs text-cream/55">{p.slug}</td>
                  <td className="px-4 py-3 text-right">{p.views30d.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-cream/70">{p.avgTime}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={`${p.bounce > 45 ? "text-rose-300" : p.bounce > 35 ? "text-amber-300" : "text-emerald-300"}`}>
                      {p.bounce ? `${p.bounce}%` : "—"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] ${
                        p.status === "Published"
                          ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-300"
                          : "border-cream/15 bg-cream/10 text-cream/60"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

const tooltip = { background: "#1c1815", border: "1px solid #ffffff15", borderRadius: 8, fontSize: 12 };

function Card({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-cream/8 bg-[#161310] p-5">
      <div className="text-[10px] uppercase tracking-[0.28em] text-cream/45">{sub}</div>
      <div className="mt-1 font-display text-xl">{title}</div>
      <div className="mt-4">{children}</div>
    </div>
  );
}
