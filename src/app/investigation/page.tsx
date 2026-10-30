import { AlertTriangle, ShieldCheck, TriangleAlert } from 'lucide-react';
import { MerchantShell } from '@/app/_components/merchant-shell';
import { evaluateTransactionRisk, type TransactionSignal } from '@/lib/risk';

type ReviewItem = TransactionSignal & {
  customer: string;
};

const reviewQueue: ReviewItem[] = [
  {
    id: 'TXN-1004',
    amount: 394.2,
    currency: 'USD',
    status: 'pending',
    merchant: 'PayPee Essentials',
    repeatedAttempts: 4,
    paymentMethod: 'card',
    riskSignals: ['amount_above_baseline', 'repeat_attempts', 'customer_mismatch'],
    customer: 'Olivia Park',
  },
  {
    id: 'TXN-1067',
    amount: 1780,
    currency: 'USD',
    status: 'pending',
    merchant: 'PayPee Essentials',
    repeatedAttempts: 2,
    paymentMethod: 'wallet',
    riskSignals: ['amount_above_baseline', 'unusual_pattern'],
    customer: 'Minh Patel',
  },
];

export default function InvestigationPage() {
  const findings = reviewQueue.map((item) => ({
    ...item,
    ...evaluateTransactionRisk(item),
  }));

  return (
    <MerchantShell
      title="Transaction Investigation"
      subtitle="Manual review queue using the local risk evaluation logic for pending transactions."
    >
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Queued</p>
          <p className="mt-3 text-3xl font-semibold">{reviewQueue.length}</p>
          <p className="mt-2 text-xs text-slate-400">Manual check required</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">High risk</p>
          <p className="mt-3 text-3xl font-semibold">{findings.filter((f) => f.severity === 'high').length}</p>
          <p className="mt-2 text-xs text-rose-400">Escalate to reviewer</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Status</p>
          <p className="mt-3 text-3xl font-semibold">Reviewing</p>
          <p className="mt-2 text-xs text-emerald-400">Policy-aligned workflow</p>
        </div>
      </section>

      <section className="mt-8 space-y-5">
        {findings.map((item) => (
          <div key={item.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-slate-400">Case {item.id}</p>
                <h3 className="text-xl font-semibold text-white">{item.customer}</h3>
              </div>
              <div className="flex items-center gap-2">
                {item.severity === 'high' ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/15 px-3 py-1 text-xs font-medium text-rose-300">
                    <TriangleAlert className="h-4 w-4" /> High risk
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-300">
                    <AlertTriangle className="h-4 w-4" /> {item.severity}
                  </span>
                )}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <div className="rounded-xl bg-slate-800/80 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Transaction</p>
                <p className="mt-2 text-2xl font-semibold">${item.amount.toFixed(2)}</p>
                <p className="mt-1 text-sm text-slate-300">{item.currency} • {item.paymentMethod}</p>
              </div>

              <div className="rounded-xl bg-slate-800/80 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Risk score</p>
                <p className="mt-2 text-2xl font-semibold text-white">{item.riskScore}</p>
                <p className="mt-1 text-sm text-slate-300">{item.evidence.join(', ')}</p>
              </div>

              <div className="rounded-xl bg-slate-800/80 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Recommendation</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">{item.recommendation}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="mb-4 flex items-center gap-2 text-emerald-300">
          <ShieldCheck className="h-5 w-5" />
          <p className="text-sm font-medium">Operational note</p>
        </div>
        <p className="text-sm leading-6 text-slate-300">
          These findings are generated from the app&apos;s deterministic risk engine and local business sample data. Live PayPal verification remains server-side only when proper sandbox credentials are configured.
        </p>
      </section>
    </MerchantShell>
  );
}
