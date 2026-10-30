import { AlertTriangle } from 'lucide-react';
import { MerchantShell } from '@/app/_components/merchant-shell';
import { getMerchantDashboardData, type MerchantDashboardData } from '@/lib/merchant-data';

type InventoryProduct = MerchantDashboardData['products'][number];

export default async function InventoryPage() {
  const dashboard = await getMerchantDashboardData();

  if (dashboard.error) {
    return (
      <MerchantShell title="Products & Inventory" subtitle="Keep the right products in stock, at a price that works.">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700">
          {dashboard.error}
        </div>
      </MerchantShell>
    );
  }

  const lowStockItems: InventoryProduct[] = dashboard.products.filter((item: InventoryProduct) => item.stock <= 25);

  return (
    <MerchantShell title="Products & Inventory" subtitle="Keep the right products in stock, at a price that works.">
      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Active products</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{dashboard.products.length}</p>
          <p className="mt-2 text-xs text-slate-500">Published in the store</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Units sold</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{dashboard.summary.paidOrders}</p>
          <p className="mt-2 text-xs text-slate-500">Completed customer orders</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Available inventory</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{dashboard.summary.totalInventoryUnits}</p>
          <p className="mt-2 text-xs text-slate-500">{dashboard.summary.lowStockProducts} product(s) below reorder point</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Inventory value</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">${dashboard.summary.totalInventoryValue.toFixed(2)}</p>
          <p className="mt-2 text-xs text-slate-500">Current stock at listed prices</p>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        {lowStockItems.length > 0 ? (
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-700">
              <AlertTriangle className="h-4 w-4" />
              <p className="text-sm font-medium">{lowStockItems[0].name} may need replenishment before the next delivery.</p>
            </div>
            <button className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">Review reorder</button>
          </div>
        ) : (
          <div className="mb-5 text-sm text-slate-500">No products are currently below the reorder threshold.</div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-slate-500">
              <tr className="border-b border-slate-200">
                <th className="pb-3 pr-4 font-medium">Product / SKU</th>
                <th className="pb-3 pr-4 font-medium">Price</th>
                <th className="pb-3 pr-4 font-medium">Unit cost</th>
                <th className="pb-3 pr-4 font-medium">Available</th>
                <th className="pb-3 pr-4 font-medium">Stock</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-500">No product records available.</td>
                </tr>
              ) : (
                dashboard.products.map((item: InventoryProduct) => {
                  const unitCost = item.margin ? item.price * (1 - item.margin) : item.price * 0.5;
                  const isLowStock = item.stock <= 25;

                  return (
                    <tr key={item.id} className="border-b border-slate-200 last:border-b-0">
                      <td className="py-3 pr-4 font-medium text-slate-800">{item.name} <span className="text-slate-500">• {item.sku}</span></td>
                      <td className="py-3 pr-4 text-slate-700">${item.price.toFixed(2)}</td>
                      <td className="py-3 pr-4 text-slate-700">${unitCost.toFixed(2)}</td>
                      <td className="py-3 pr-4 text-slate-700">{item.stock}</td>
                      <td className="py-3 pr-4 text-slate-700">{item.margin ? `${(item.margin * 100).toFixed(0)}%` : '0%'}</td>
                      <td className="py-3 pr-4">
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${isLowStock ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                          {isLowStock ? 'Low stock' : 'Available'}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </MerchantShell>
  );
}
