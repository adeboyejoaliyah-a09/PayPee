import { ArrowRight, TrendingUp } from 'lucide-react';
import { MerchantShell } from '@/app/_components/merchant-shell';

const opportunities = [
  { name: 'High-margin bundles', impact: '+14.3% avg. order value', status: 'Ready to test' },
  { name: 'Repeat buyer retention', impact: '+9.1% conversion lift', status: 'Pilot active' },
  { name: 'Marketplace expansion', impact: '+6.7% revenue potential', status: 'Review required' },
];

export default function GrowthPage() {
  return (
    <MerchantShell
      title="Growth Opportunities"
      subtitle="Prioritized expansion ideas grounded in revenue quality and merchant performance."
    >
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Pipeline</p>
          <p className="mt-3 text-3xl font-semibold">$64.8K</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Win rate</p>
          <p className="mt-3 text-3xl font-semibold">38%</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Projected lift</p>
          <p className="mt-3 text-3xl font-semibold">+12.7%</p>
        </div>
      </section>

      <section className="mt-8 space-y-5">
        {opportunities.map((opportunity) => (
          <div key={opportunity.name} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-violet-500/15 p-2 text-violet-300">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">{opportunity.name}</p>
                  <p className="text-sm text-slate-400">{opportunity.impact}</p>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs text-slate-200">
                {opportunity.status}
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </div>
        ))}
      </section>
    </MerchantShell>
  );
}
