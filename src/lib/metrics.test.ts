import { describe, expect, it } from 'vitest';
import { calculateFinancialSummary } from './metrics';

describe('calculateFinancialSummary', () => {
  it('returns revenue, profit, and margin', () => {
    const summary = calculateFinancialSummary([
      { amount: 120, kind: 'sale', currency: 'USD' },
      { amount: 40, kind: 'expense', currency: 'USD' },
      { amount: 65, kind: 'sale', currency: 'USD' },
      { amount: 25, kind: 'expense', currency: 'USD' },
    ]);

    expect(summary.revenue).toBe(185);
    expect(summary.expenses).toBe(65);
    expect(summary.grossProfit).toBe(120);
    expect(summary.netProfit).toBe(120);
    expect(summary.margin).toBeCloseTo(64.86, 2);
  });
});
