import Link from 'next/link';
import { Search } from 'lucide-react';
import { MerchantShell } from '@/app/_components/merchant-shell';
import { getMerchantDashboardData } from '@/lib/merchant-data';

const statusStyles: Record<string, string> = {
  completed: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-amber-100 text-amber-700',
  held: 'bg-rose-100 text-rose-700',
};

export default async function TransactionsPage() {
  const dashboard = await getMerchantDashboardData();

  if (dashboard.error) {
    return (
      <MerchantShell title="Transactions" subtitle="Track every payment, refund, and authorization in one place.">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700">
          {dashboard.error}
        </div>
      </MerchantShell>
    );
  }

  return (
    <MerchantShell
      title="Transactions"
      subtitle="Track every payment, refund, and authorization in one place."
      actions={
        <div className="flex gap-2">
          <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">Export CSV</button>
          <Link href="/investigation" className="rounded-xl bg-violet-600 px-3 py-2 text-sm font-medium text-white hover:bg-violet-500">Open review queue</Link>
        </div>
      }
    >
      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Captured payments</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">${dashboard.summary.netSales.toFixed(2)}</p>
          <p className="mt-2 text-xs text-slate-500">Sum of completed orders</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Pending authorization</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{dashboard.summary.pendingAuthorizations}</p>
          <p className="mt-2 text-xs text-slate-500">Orders awaiting review</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Held reviews</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{dashboard.summary.heldTransactions}</p>
          <p className="mt-2 text-xs text-amber-700">Manual investigation needed</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Inventory value</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">${dashboard.summary.totalInventoryValue.toFixed(2)}</p>
          <p className="mt-2 text-xs text-slate-500">From current stock</p>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            {['All payments', 'Paid', 'Pending', 'Held'].map((tab, index) => (
              <button
                key={tab}
                className={`rounded-full px-3 py-1.5 ${index === 0 ? 'bg-violet-100 text-violet-800' : 'bg-slate-100 text-slate-600'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
              <Search className="h-3.5 w-3.5" />
              Search order, name or payment ID
            </div>
            <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">Filters</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr className="border-b border-slate-200">
                <th className="pb-3 pr-4 font-medium">Order / payment ID</th>
                <th className="pb-3 pr-4 font-medium">Customer</th>
                <th className="pb-3 pr-4 font-medium">Date</th>
                <th className="pb-3 pr-4 font-medium">Amount</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 pr-4 font-medium">Review</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-500">No transaction records available.</td>
                </tr>
              ) : (
                dashboard.orders.map((txn) => (
                  <tr key={txn.id} className="border-b border-slate-200 last:border-b-0">
                    <td className="py-3 pr-4 font-medium text-slate-800">{txn.providerOrder ?? txn.id.slice(0, 8)}</td>
                    <td className="py-3 pr-4 text-slate-700">{txn.customerName}</td>
                    <td className="py-3 pr-4 text-slate-600">{new Date(txn.createdAt).toISOString().slice(0, 10)}</td>
                    <td className="py-3 pr-4 font-medium text-slate-900">${Number(txn.amount).toFixed(2)}</td>
                    <td className="py-3 pr-4">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs ${statusStyles[txn.status.toLowerCase()] ?? 'bg-slate-100 text-slate-600'}`}>{txn.status}</span>
                    </td>
                    <td className="py-3 pr-4">
                      {txn.status === 'pending' ? <button className="text-violet-700">Authorization</button> : txn.status === 'held' ? <button className="text-violet-700">View details</button> : null}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </MerchantShell>
  );
}
