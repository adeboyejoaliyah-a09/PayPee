import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { MerchantShell } from '@/app/_components/merchant-shell';
import { getMerchantDashboardData } from '@/lib/merchant-data';

export default async function OverviewPage() {
  const dashboard = await getMerchantDashboardData();

  if (dashboard.error) {
    return (
      <MerchantShell title="Business overview" subtitle="The overview page for your merchant operations and current performance.">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700">
          {dashboard.error}
        </div>
      </MerchantShell>
    );
  }

  const metrics = [
    { label: 'Net sales', value: `$${dashboard.summary.netSales.toFixed(2)}`, change: `${dashboard.summary.paidOrders} paid orders` },
    { label: 'Pending auth', value: `${dashboard.summary.pendingAuthorizations}`, change: 'Awaiting review' },
    { label: 'Held reviews', value: `${dashboard.summary.heldTransactions}`, change: 'Manual action needed' },
    { label: 'Inventory value', value: `$${dashboard.summary.totalInventoryValue.toFixed(2)}`, change: `${dashboard.summary.lowStockProducts} low-stock products` },
  ];

  return (
    <MerchantShell title="Business overview" subtitle="The overview page for your merchant operations and current performance.">
      <section className="grid gap-4 md:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{metric.label}</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <span className="text-3xl font-semibold tracking-tight text-slate-900">{metric.value}</span>
              <span className="text-xs text-emerald-600">{metric.change}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">Recent transaction activity</p>
            <h3 className="text-2xl font-semibold text-slate-900">Recent payments</h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr className="border-b border-slate-200">
                <th className="pb-3 pr-4 font-medium">Order / customer</th>
                <th className="pb-3 pr-4 font-medium">Time</th>
                <th className="pb-3 pr-4 font-medium">Amount</th>
                <th className="pb-3 pr-4 font-medium">Payment status</th>
                <th className="pb-3 pr-4 font-medium">Next step</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-slate-500">No transaction records found yet.</td>
                </tr>
              ) : (
                dashboard.orders.slice(0, 4).map((row) => (
                  <tr key={row.id} className="border-b border-slate-200 last:border-b-0">
                    <td className="py-3 pr-4 font-medium text-slate-800">{row.providerOrder ?? row.id.slice(0, 8)} • {row.customerName}</td>
                    <td className="py-3 pr-4 text-slate-600">{new Date(row.createdAt).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</td>
                    <td className="py-3 pr-4 font-medium text-slate-800">${Number(row.amount).toFixed(2)}</td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs ${row.status === 'pending' ? 'bg-amber-100 text-amber-700' : row.status === 'held' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {row.status === 'held' ? 'Held' : row.status === 'pending' ? 'Pending' : 'Completed'}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <button className="inline-flex items-center gap-1 text-violet-700">Investigate <ArrowRight className="h-3.5 w-3.5" /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-8 rounded-2xl border border-violet-100 bg-violet-50 p-4 text-sm text-violet-800">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>AI guidance is based on the current merchant dataset and does not fabricate financial results.</span>
        </div>
      </div>
    </MerchantShell>
  );
}
