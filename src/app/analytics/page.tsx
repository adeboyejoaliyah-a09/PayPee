import { TrendingUp } from 'lucide-react';
import { MerchantShell } from '@/app/_components/merchant-shell';

const salesBars = [36, 48, 52, 61, 58, 74, 80];

const tableRows = [
  { item: 'Net sales', oct28: '$48,320', sep28: '$42,760', change: '+13.0%', share: '100.0%' },
  { item: 'Cost of goods sold', oct28: '$19,328', sep28: '$17,104', change: '+13.0%', share: '40.0%' },
  { item: 'Gross profit', oct28: '$18,992', sep28: '$25,656', change: '+13.0%', share: '60.0%' },
  { item: 'Operating expenses', oct28: '$14,640', sep28: '$13,716', change: '+6.7%', share: '30.3%' },
  { item: 'Operating profit', oct28: '$14,352', sep28: '$11,940', change: '+20.2%', share: '27.7%' },
];

export default function AnalyticsPage() {
  return (
    <MerchantShell title="Analytics" subtitle="Your performance, reconciled. Compare like-for-like reporting periods.">
      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Net sales</p>
          <p className="mt-3 text-3xl font-semibold">$48,320</p>
          <p className="mt-2 text-xs text-emerald-600">+13.0% vs. Sep 1-26</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total expenses</p>
          <p className="mt-3 text-3xl font-semibold">$33,968</p>
          <p className="mt-2 text-xs text-slate-500">-10.2% vs. Sep 1-26</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Operating profit</p>
          <p className="mt-3 text-3xl font-semibold">$14,352</p>
          <p className="mt-2 text-xs text-emerald-600">+20.2% vs. Sep 1-26</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Operating margin</p>
          <p className="mt-3 text-3xl font-semibold">29.7%</p>
          <p className="mt-2 text-xs text-violet-700">+1.8 percentage points</p>
        </div>
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1.6fr_0.8fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Revenue trend</p>
              <h3 className="mt-2 text-2xl font-semibold text-slate-900">Week by week</h3>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700">
              <TrendingUp className="h-3.5 w-3.5" /> Sales
            </div>
          </div>

          <div className="flex h-52 items-end gap-3">
            {salesBars.map((bar, index) => (
              <div key={index} className="flex-1 rounded-t-xl bg-violet-100" style={{ height: `${bar}%` }} />
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
            <span>Oct 1-7</span>
            <span>Oct 8-14</span>
            <span>Oct 15-21</span>
            <span>Oct 22-28</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Where the money goes</p>
          <div className="mt-5 space-y-4">
            {[
              ['Cost of goods sold', '$19,328'],
              ['Marketing', '$5,800'],
              ['Fulfilment', '$4,620'],
              ['Payroll & software', '$2,770'],
              ['Payment fees', '$1,450'],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="mb-1 flex items-center justify-between text-sm text-slate-600">
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div className="h-2 rounded-full bg-violet-500" style={{ width: label === 'Cost of goods sold' ? '80%' : label === 'Marketing' ? '55%' : label === 'Fulfilment' ? '40%' : label === 'Payroll & software' ? '30%' : '18%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xl font-semibold text-slate-900">Profit &amp; loss</p>
          <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">View expense ledger</button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr className="border-b border-slate-200">
                <th className="pb-3 pr-4 font-medium">Item</th>
                <th className="pb-3 pr-4 font-medium">Oct 1-28</th>
                <th className="pb-3 pr-4 font-medium">Sep 1-28</th>
                <th className="pb-3 pr-4 font-medium">Change</th>
                <th className="pb-3 pr-4 font-medium">% of sales</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row) => (
                <tr key={row.item} className="border-b border-slate-200 last:border-b-0">
                  <td className="py-3 pr-4 font-medium text-slate-800">{row.item}</td>
                  <td className="py-3 pr-4 text-slate-700">{row.oct28}</td>
                  <td className="py-3 pr-4 text-slate-700">{row.sep28}</td>
                  <td className="py-3 pr-4 text-emerald-600">{row.change}</td>
                  <td className="py-3 pr-4 text-slate-600">{row.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </MerchantShell>
  );
}
