import Link from "next/link";
import { BarChart3, Box, FileText, Key, LayoutDashboard, Terminal } from "lucide-react";

const sidebarNavItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Playground", href: "/playground", icon: Terminal },
  { title: "Models", href: "/models", icon: Box },
  { title: "API Keys", href: "/settings/keys", icon: Key },
  { title: "Docs", href: "/docs", icon: FileText },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-border/40 bg-card hidden md:flex flex-col">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Box className="h-6 w-6" />
            <span>SCL Aggregator</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {sidebarNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
