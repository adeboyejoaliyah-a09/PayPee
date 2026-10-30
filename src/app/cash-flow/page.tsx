import { ArrowDownRight, ArrowUpRight, Wallet } from 'lucide-react';
import { MerchantShell } from '@/app/_components/merchant-shell';

export default function CashFlowPage() {
  return (
    <MerchantShell
      title="Cash Flow & Savings"
      subtitle="Working capital movement and savings opportunities from the merchant operating view."
    >
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Net cash</p>
          <p className="mt-3 text-3xl font-semibold">$76.2K</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Savings</p>
          <p className="mt-3 text-3xl font-semibold">$9.4K</p>
          <p className="mt-2 text-xs text-emerald-400">+4.8%</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Burn rate</p>
          <p className="mt-3 text-3xl font-semibold">$21.1K</p>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="mb-4 flex items-center gap-2 text-emerald-300">
            <ArrowUpRight className="h-4 w-4" />
            <p className="text-sm font-medium">Incoming funds</p>
          </div>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="rounded-lg bg-slate-800 p-3">Sales receipts: $91.5K</li>
            <li className="rounded-lg bg-slate-800 p-3">Marketplace payouts: $18.7K</li>
            <li className="rounded-lg bg-slate-800 p-3">Refund recovery: $4.2K</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="mb-4 flex items-center gap-2 text-amber-300">
            <ArrowDownRight className="h-4 w-4" />
            <p className="text-sm font-medium">Outgoing costs</p>
          </div>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="rounded-lg bg-slate-800 p-3">Inventory purchases: $38.4K</li>
            <li className="rounded-lg bg-slate-800 p-3">Shipping and fulfillment: $14.9K</li>
            <li className="rounded-lg bg-slate-800 p-3">Operations and software: $11.2K</li>
          </ul>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="mb-3 flex items-center gap-2 text-blue-300">
          <Wallet className="h-4 w-4" />
          <p className="text-sm font-medium">Working capital note</p>
        </div>
        <p className="text-sm leading-6 text-slate-300">
          Cash position remains stable, and a modest reduction in shipping overhead could unlock an additional reserve for seasonal inventory expansion.
        </p>
      </section>
    </MerchantShell>
  );
}
