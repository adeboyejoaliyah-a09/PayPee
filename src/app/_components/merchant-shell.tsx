'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, ChevronDown, HelpCircle, Search, ShieldCheck, ShoppingBag, Wallet, ArrowRight } from 'lucide-react';

export const navItems = [
  { label: 'Overview', href: '/' },
  { label: 'Transactions', href: '/transactions' },
  { label: 'Intelligence', href: '/intelligence' },
  { label: 'Analytics', href: '/analytics' },
  { label: 'Products & Inventory', href: '/inventory' },
  { label: 'Cash Flow & Savings', href: '/cash-flow' },
  { label: 'Growth Opportunities', href: '/growth' },
  { label: 'Activity & Audit Log', href: '/activity' },
  { label: 'Settings & Integrations', href: '/settings' },
] as const;

type MerchantShellProps = {
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

export function MerchantShell({ title, subtitle, actions, children }: MerchantShellProps) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-[#f3f1ee] text-slate-900">
      <div className="flex min-h-screen">
        <aside className="w-[260px] border-r border-slate-200 bg-[#f8f8f7] p-4">
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-2 py-2 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-violet-700 text-sm font-bold text-white shadow-md shadow-violet-200">
              r
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">relay</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">business os</p>
            </div>
          </div>

          <div className="mb-4 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-xs font-semibold text-slate-700">F</div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Form & Field</p>
                  <p className="text-[10px] text-slate-500">formfield.co</p>
                </div>
              </div>
              <button className="rounded-md border border-slate-200 bg-slate-50 p-1 text-slate-500">↻</button>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                    isActive ? 'bg-violet-100 text-violet-900 shadow-sm ring-1 ring-violet-200' : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'
                  }`}
                >
                  <span className="flex h-4 w-4 items-center justify-center text-[10px]">
                    {item.label.includes('Transactions') ? '↔' : item.label.includes('Intelligence') ? '✦' : item.label.includes('Analytics') ? '▣' : item.label.includes('Inventory') ? '◫' : item.label.includes('Cash') ? '▤' : item.label.includes('Growth') ? '↗' : item.label.includes('Activity') ? '◫' : item.label.includes('Settings') ? '◌' : '⌂'}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 space-y-3 border-t border-slate-200 pt-4">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="flex h-3 w-3 items-center justify-center rounded-full border border-emerald-500 bg-emerald-400/20 text-[8px] text-emerald-700">✓</span>
              PayPal connected
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">AL</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">Alex Lee</p>
                <p className="text-[11px] text-slate-500">Owner • All permissions</p>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-[#f9f9f8] px-5">
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <span>Form &amp; Field</span>
              <span>/</span>
              <span className="font-medium text-slate-700">{title}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-600">
                <span>USD</span>
                <ChevronDown className="h-3 w-3" />
              </div>
              <button className="rounded-full border border-slate-200 bg-white p-2 text-slate-600"><Search className="h-4 w-4" /></button>
              <button className="rounded-full border border-slate-200 bg-white p-2 text-slate-600"><Bell className="h-4 w-4" /></button>
              <button className="rounded-full border border-slate-200 bg-white p-2 text-slate-600"><HelpCircle className="h-4 w-4" /></button>
            </div>
          </header>

          <div className="px-6 py-7">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">{subtitle}</p>
                <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">{title}</h1>
              </div>
              {actions && <div>{actions}</div>}
            </div>
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
