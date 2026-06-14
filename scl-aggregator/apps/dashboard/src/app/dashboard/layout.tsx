import Link from "next/link";
import { Terminal, Key, CreditCard, Activity, BookOpen, LogOut } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="text-primary">SCL</span>
              <span>Aggregator</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 py-4 gap-1">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Terminal className="h-4 w-4" />
                Overview
              </Link>
              <Link
                href="/dashboard/playground"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Activity className="h-4 w-4" />
                Playground
              </Link>
              <Link
                href="/dashboard/keys"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Key className="h-4 w-4" />
                API Keys
              </Link>
              <Link
                href="/dashboard/usage"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Activity className="h-4 w-4" />
                Usage
              </Link>
              <Link
                href="/dashboard/billing"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <CreditCard className="h-4 w-4" />
                Billing
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-end">
          <Link href="/api/auth/signout" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Link>
        </header>
        <main className="flex-1 flex flex-col p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
