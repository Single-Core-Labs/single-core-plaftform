import { BookOpen, Code, Zap } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Documentation</h1>
        <p className="text-xl text-muted-foreground">Everything you need to integrate SCL Aggregator into your applications.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-lg border p-4 space-y-2">
          <Zap className="h-6 w-6 text-primary" />
          <h3 className="font-bold">Quickstart</h3>
          <p className="text-sm text-muted-foreground">Get up and running in less than 5 minutes.</p>
        </div>
        <div className="rounded-lg border p-4 space-y-2">
          <Code className="h-6 w-6 text-primary" />
          <h3 className="font-bold">API Reference</h3>
          <p className="text-sm text-muted-foreground">Detailed endpoints and parameter descriptions.</p>
        </div>
        <div className="rounded-lg border p-4 space-y-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <h3 className="font-bold">Guides</h3>
          <p className="text-sm text-muted-foreground">Best practices for routing and cost optimization.</p>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Authentication</h2>
        <p>All API requests must include your API key in the <code>Authorization</code> header.</p>
        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
          <code>Authorization: Bearer YOUR_API_KEY</code>
        </pre>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold border-b pb-2">Making a Request</h2>
        <p>Send a POST request to <code>https://api.singlecorelabs.com/v1/chat/completions</code> with your model choice.</p>
        <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
{`curl https://api.singlecorelabs.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $SCL_API_KEY" \\
  -d '{
    "model": "gpt-4o",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'`}
        </pre>
      </div>
    </div>
  );
}
