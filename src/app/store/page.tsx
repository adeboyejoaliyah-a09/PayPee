import { Check, CreditCard, ShoppingCart, ShieldCheck } from 'lucide-react';

const products = [
  { name: 'Classic Tee', price: 36, description: 'Premium cotton for everyday wear.', accent: 'bg-emerald-500/20 text-emerald-200' },
  { name: 'Travel Mug', price: 24, description: 'Double wall thermal insulation.', accent: 'bg-blue-500/20 text-blue-200' },
  { name: 'Wireless Mouse', price: 54, description: 'Low-latency precision mouse.', accent: 'bg-violet-500/20 text-violet-200' },
];

export default function StorePage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Northwind Commerce</p>
            <h1 className="mt-2 text-4xl font-bold">Storefront demo</h1>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-300">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            Secure sandbox checkout
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
          <section className="grid gap-5 md:grid-cols-3">
            {products.map((product) => (
              <article key={product.name} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <div className={`mb-4 inline-flex rounded-full px-2 py-1 text-xs font-medium ${product.accent}`}>
                  Best seller
                </div>
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="mt-2 text-sm text-slate-400">{product.description}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-2xl font-bold">${product.price}</span>
                  <button className="rounded-xl bg-emerald-500 px-3 py-2 text-sm font-medium text-slate-950 hover:bg-emerald-400">
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </section>

          <aside className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="mb-4 flex items-center gap-2 text-slate-200">
              <ShoppingCart className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Checkout</h2>
            </div>

            <div className="space-y-4 border-b border-slate-800 pb-5 text-sm text-slate-300">
              <div className="flex justify-between"><span>Classic Tee</span><span>$36</span></div>
              <div className="flex justify-between"><span>Travel Mug</span><span>$24</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
            </div>

            <div className="mt-5 flex items-center justify-between text-lg font-semibold">
              <span>Total</span>
              <span>$60</span>
            </div>

            <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-500">
              <CreditCard className="h-4 w-4" />
              Pay with PayPal Sandbox
            </button>

            <div className="mt-5 rounded-xl border border-emerald-800 bg-emerald-500/10 p-3 text-sm text-emerald-200">
              <div className="flex items-center gap-2"><Check className="h-4 w-4" /> Verified demo order, no live payment captured.</div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
