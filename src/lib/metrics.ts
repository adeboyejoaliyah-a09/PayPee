export type FinancialEntry = {
  amount: number;
  kind: 'sale' | 'expense' | 'refund';
  currency: string;
};

export function calculateFinancialSummary(entries: FinancialEntry[]) {
  const revenue = entries
    .filter((entry) => entry.kind === 'sale')
    .reduce((sum, entry) => sum + entry.amount, 0);

  const expenses = entries
    .filter((entry) => entry.kind === 'expense')
    .reduce((sum, entry) => sum + entry.amount, 0);

  const grossProfit = Math.max(revenue - expenses, 0);
  const netProfit = grossProfit;
  const margin = revenue > 0 ? (netProfit / revenue) * 100 : 0;

  return {
    revenue,
    expenses,
    grossProfit,
    netProfit,
    margin,
  };
}
