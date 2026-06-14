export default function KeysPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold tracking-tight">API Keys</h1>
      <p className="text-muted-foreground">Manage your SCL API keys for authentication.</p>
      
      <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Active Keys</h2>
          <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:opacity-90">
            Create Key
          </button>
        </div>
        <p className="text-sm text-muted-foreground">You do not have any API keys yet.</p>
      </div>
    </div>
  );
}
