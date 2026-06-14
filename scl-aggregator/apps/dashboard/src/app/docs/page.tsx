import Link from "next/link";

export default function DocsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">API Documentation</h1>
      <p className="text-muted-foreground mb-8 text-lg">Full OpenAPI specifications coming soon.</p>
      <Link
        href="/"
        className="px-6 py-3 border border-input bg-background font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        Back to Home
      </Link>
    </main>
  );
}
