import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">SCL Model Aggregator</h1>
      <p className="text-muted-foreground mb-8 text-lg">One API. Every Model. Infinite Scale.</p>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:opacity-90 transition-opacity"
        >
          Get Started
        </Link>
        <Link
          href="/docs"
          className="px-6 py-3 border border-input bg-background font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Documentation
        </Link>
      </div>
    </main>
  );
}
