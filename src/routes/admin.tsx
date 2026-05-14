import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Aranya Console — Admin" },
      { name: "description", content: "Aranya operations console — orders, products, customers, analytics." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminShell,
});
