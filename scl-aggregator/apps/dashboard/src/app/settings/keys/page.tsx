import { ApiKeyCard } from "@/components/ApiKeyCard";
import { Plus } from "lucide-react";

export default function KeysPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tighter">API Keys</h1>
          <p className="text-muted-foreground">Manage your secret keys to access the SCL API.</p>
        </div>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground h-10 px-4 py-2">
          <Plus className="mr-2 h-4 w-4" /> Create New Key
        </button>
      </div>

      <div className="grid gap-6">
        <ApiKeyCard 
          name="Production App" 
          apiKey="scl_live_51P2z8X7v9w0QyR4t" 
          created="2024-05-20" 
        />
        <ApiKeyCard 
          name="Development Env" 
          apiKey="scl_test_9k8j7h6g5f4d3s2a" 
          created="2024-06-01" 
        />
      </div>
      
      <div className="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4 text-sm text-yellow-200">
        <p className="font-semibold">Security Warning</p>
        <p>Your API keys carry as many privileges as your account. Never share your secret API keys in public places like GitHub, or use them in client-side code.</p>
      </div>
    </div>
  );
}
