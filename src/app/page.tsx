import { ArrowRight, CheckCircle2, DollarSign, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react';

const navItems = ['Overview', 'Transactions', 'Transaction Investigation', 'Intelligence', 'Analytics', 'Products & Inventory', 'Cash Flow & Savings', 'Growth Opportunities'];
const metrics = [
  { label: 'Gross revenue', value: '$284.6K', change: '+12.4%' },
  { label: 'Open issues', value: '14', change: '5 urgent' },
  { label: 'Risk alerts', value: '3', change: '2 high' },
  { label: 'Cash flow', value: '$76.2K', change: '+8.1%' },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <aside className="w-72 border-r border-slate-800 bg-slate-900/80 p-6">
          <div className="mb-10 flex items-center gap-3">
            <div className="rounded-xl bg-blue-600 p-2 text-white">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Merchant OS</p>
              <h1 className="text-xl font-semibold">PayPal AI</h1>
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item, index) => (
              <button
                key={item}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm ${
                  index === 0 ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800/80'
                }`}
              >
                <span>{item}</span>
                {index === 0 && <ArrowRight className="h-4 w-4" />}
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex-1 p-8">
          <header className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-300">Welcome back</p>
              <h2 className="text-3xl font-bold">Business overview</h2>
            </div>
            <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
              Create report
            </button>
          </header>

          <section className="grid gap-4 md:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg shadow-slate-950/30">
                <p className="text-sm text-slate-400">{metric.label}</p>
                <div className="mt-3 flex items-end justify-between">
                  <span className="text-2xl font-semibold">{metric.value}</span>
                  <span className="text-xs text-emerald-400">{metric.change}</span>
                </div>
              </div>
            ))}
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Revenue trend</p>
                  <h3 className="text-xl font-semibold">Quarterly performance</h3>
                </div>
                <TrendingUp className="h-5 w-5 text-emerald-400" />
              </div>

              <div className="flex h-56 items-end gap-3">
                {[36, 48, 52, 61, 58, 74, 80].map((bar, idx) => (
                  <div key={idx} className="flex-1 rounded-t-xl bg-gradient-to-t from-blue-700 to-cyan-400" style={{ height: `${bar}%` }} />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <div className="mb-4 flex items-center gap-2 text-amber-300">
                  <ShieldAlert className="h-5 w-5" />
                  <p className="text-sm font-medium">Risk alerts</p>
                </div>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="rounded-lg bg-slate-800/80 p-3">High-risk refund pattern for orders over $2,500.</li>
                  <li className="rounded-lg bg-slate-800/80 p-3">Duplicate customer data detected in one shipping profile.</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <div className="mb-4 flex items-center gap-2 text-emerald-300">
                  <Sparkles className="h-5 w-5" />
                  <p className="text-sm font-medium">AI guidance</p>
                </div>
                <p className="text-sm text-slate-300">
                  Inventory turnover improved 9.6% after pricing updates in your top item clusters.
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm text-blue-300">
                  <CheckCircle2 className="h-4 w-4" />
                  Action recommended: review high-margin SKUs this week.
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
