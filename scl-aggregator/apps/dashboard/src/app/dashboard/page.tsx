export default function DashboardOverview() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
      <p className="text-muted-foreground">Welcome to the SCL Aggregator. View your usage and manage your keys here.</p>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Placeholder cards */}
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Requests (30d)</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">--</div>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Cache Hit Rate</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">--%</div>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Tokens Processed</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">--</div>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Credit Balance</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">$0.00</div>
          </div>
        </div>
      </div>
    </div>
  );
}
