export default function UsagePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold tracking-tight">Usage History</h1>
      <p className="text-muted-foreground">View your token usage broken down by model and provider.</p>
      
      <div className="rounded-xl border bg-card text-card-foreground shadow p-6 h-[400px] flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Chart coming soon...</p>
      </div>
    </div>
  );
}
