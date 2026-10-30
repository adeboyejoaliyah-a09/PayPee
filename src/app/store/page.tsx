import Link from 'next/link';
import { ArrowRight, Check, CreditCard, Search, ShieldCheck, ShoppingCart } from 'lucide-react';

const categories = ['All', 'Audio', 'Desk', 'Tech', 'Travel', 'Essentials'];

const products = [
  { name: 'Classic Tee', price: 36, tag: 'Best seller', accent: 'from-violet-500/30 to-violet-200/30', badge: 'bg-violet-600/10 text-violet-700', image: 'bg-gradient-to-br from-slate-200 to-violet-300' },
  { name: 'Travel Mug', price: 24, tag: 'New', accent: 'from-sky-500/30 to-cyan-200/30', badge: 'bg-sky-600/10 text-sky-700', image: 'bg-gradient-to-br from-slate-200 to-sky-300' },
  { name: 'Wireless Mouse', price: 54, tag: 'Popular', accent: 'from-emerald-500/30 to-emerald-200/30', badge: 'bg-emerald-600/10 text-emerald-700', image: 'bg-gradient-to-br from-slate-200 to-emerald-300' },
  { name: 'Desk Lamp', price: 68, tag: 'Featured', accent: 'from-amber-500/30 to-amber-200/30', badge: 'bg-amber-600/10 text-amber-700', image: 'bg-gradient-to-br from-slate-200 to-amber-300' },
];

const cartItems = [
  { name: 'Classic Tee', price: 36 },
  { name: 'Travel Mug', price: 24 },
  { name: 'Shipping', price: 0 },
];

export default function StorePage() {
  return (
    <main className="min-h-screen bg-[#f4f1f6] px-5 py-8 text-slate-900 md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 rounded-[28px] border border-slate-200 bg-white/80 px-5 py-4 shadow-[0_10px_35px_rgba(15,23,42,0.06)] backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-600 text-lg font-bold text-white shadow-lg shadow-violet-200">
                P
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-violet-600">PayPee</p>
                <h1 className="text-xl font-semibold tracking-tight text-slate-900">Marketplace</h1>
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
              {['Shop', 'Collections', 'New arrivals', 'Support'].map((item) => (
                <button key={item} className="rounded-full px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">
                  {item}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button className="rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm">
                <Search className="h-4 w-4" />
              </button>
              <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                Merchant dashboard
              </Link>
            </div>
          </div>
        </header>

        <section className="mb-8 overflow-hidden rounded-[30px] border border-slate-200 bg-gradient-to-r from-[#f5f3ff] via-white to-[#f8fafc] shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
          <div className="grid gap-8 px-6 py-8 md:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-violet-600">Curated essentials</p>
              <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Smart tools for better business flow.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-6 text-slate-600">
                Explore premium office, productivity, and travel essentials designed for modern merchants and growing teams.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-200 transition hover:bg-violet-500">
                  Shop now <ArrowRight className="h-4 w-4" />
                </button>
                <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300">
                  View dashboard
                </Link>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/70">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">This week</p>
                  <h3 className="mt-1 text-2xl font-bold text-slate-900">$18,420</h3>
                </div>
                <div className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">+12.4%</div>
              </div>
              <div className="space-y-3">
                {['Home office', 'Travel gear', 'Accessories'].map((label, index) => (
                  <div key={label} className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-3">
                    <span className="text-sm text-slate-600">{label}</span>
                    <span className="text-sm font-semibold text-slate-900">{['4.2k', '2.9k', '1.8k'][index]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 flex flex-wrap items-center gap-3">
          {categories.map((category, idx) => (
            <button
              key={category}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                idx === 0 ? 'bg-violet-600 text-white shadow-lg shadow-violet-200' : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              {category}
            </button>
          ))}
        </section>

        <div className="grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">
          <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <article key={product.name} className="overflow-hidden rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
                <div className={`mb-4 flex h-52 items-end rounded-[20px] border border-slate-200 bg-gradient-to-br ${product.accent} p-4`}>
                  <div className="flex w-full items-start justify-between">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${product.badge}`}>
                      {product.tag}
                    </span>
                    <button className="rounded-full border border-slate-200 bg-white/80 px-2.5 py-1 text-[10px] font-medium text-slate-700">
                      Save
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">Premium essentials</p>
                  </div>
                  <span className="text-xl font-bold text-slate-900">${product.price}</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-medium text-emerald-700">In stock</span>
                  <button className="rounded-full bg-violet-600 px-3.5 py-2 text-sm font-medium text-white shadow-md shadow-violet-200 transition hover:bg-violet-500">
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </section>

          <aside className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-900">
                <ShoppingCart className="h-5 w-5 text-violet-600" />
                <h2 className="text-xl font-semibold">Checkout</h2>
              </div>
              <div className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-medium text-violet-700">3 items</div>
            </div>

            <div className="space-y-4 border-b border-slate-200 pb-5">
              {cartItems.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm text-slate-600">
                  <span>{item.name}</span>
                  <span className="font-medium text-slate-900">${item.price}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between text-lg font-semibold text-slate-900">
              <span>Total</span>
              <span>$60</span>
            </div>

            <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-500">
              <CreditCard className="h-4 w-4" />
              Pay with PayPal Sandbox
            </button>

            <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                Verified demo order, no live payment captured.
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
              <p className="font-medium text-slate-800">Secure checkout</p>
              <p className="mt-1">Sandbox environment under PayPal verification flow.</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
