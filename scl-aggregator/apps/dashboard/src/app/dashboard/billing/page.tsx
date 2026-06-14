export default function BillingPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold tracking-tight">Billing & Credits</h1>
      <p className="text-muted-foreground">Top up your credits to use the SCL Aggregator.</p>
      
      <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Credit Packs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {["$10", "$50", "$100", "$500"].map((pack) => (
            <div key={pack} className="border border-border rounded-lg p-4 text-center hover:border-primary transition-colors cursor-pointer">
              <div className="text-2xl font-bold mb-2">{pack}</div>
              <button className="w-full py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-muted">
                Purchase
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
