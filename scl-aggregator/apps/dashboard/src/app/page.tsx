import Link from "next/link";
import { ArrowRight, Box, Zap, Shield, BarChart3 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="/">
          <Box className="h-6 w-6 mr-2" />
          <span className="font-bold">SCL Aggregator</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#pricing">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/playground">
            Playground
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/dashboard">
            Dashboard
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Unified AI API for Everyone
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  One API to access all major LLMs. Compare latency, cost, and performance in real-time.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/dashboard">
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8 py-2">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </Link>
                <Link href="/playground">
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-8 py-2">
                    Try Playground
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-background rounded-full">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Fast Routing</h2>
                <p className="text-muted-foreground text-sm">
                  Intelligent routing to the fastest and cheapest provider based on your prompt.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-background rounded-full">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Secure Keys</h2>
                <p className="text-muted-foreground text-sm">
                  Enterprise-grade key management with fine-grained permissions and usage limits.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-background rounded-full">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Detailed Analytics</h2>
                <p className="text-muted-foreground text-sm">
                  Real-time tracking of token usage, latency, and costs across all providers.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-border/40">
        <p className="text-xs text-muted-foreground">© 2026 Single Core Labs. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
