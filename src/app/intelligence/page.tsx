import { BrainCircuit, Sparkles } from 'lucide-react';
import { MerchantShell } from '@/app/_components/merchant-shell';
import { aiSummary } from '@/lib/business-data';

export default function IntelligencePage() {
  return (
    <MerchantShell
      title="Intelligence"
      subtitle="AI-generated operating guidance using the current merchant dataset and demo-safe logic."
    >
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-4 flex items-center gap-2 text-violet-300">
          <BrainCircuit className="h-5 w-5" />
          <p className="text-sm font-medium">AI summary</p>
        </div>
        <p className="max-w-3xl text-lg leading-8 text-slate-200">{aiSummary.headline}</p>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-3">
        {aiSummary.stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="mb-4 flex items-center gap-2 text-blue-300">
          <Sparkles className="h-4 w-4" />
          <p className="text-sm font-medium">Recommended actions</p>
        </div>
        <ul className="space-y-3 text-sm text-slate-300">
          <li className="rounded-lg bg-slate-800 p-3">Review the three open risk alerts before the next payout cycle.</li>
          <li className="rounded-lg bg-slate-800 p-3">Increase stock coverage on premium desk accessories with the strongest margin retention.</li>
          <li className="rounded-lg bg-slate-800 p-3">Allocate incremental sales spend to repeat-buyer campaigns with the highest conversion from the current quarter.</li>
        </ul>
      </section>
    </MerchantShell>
  );
}
