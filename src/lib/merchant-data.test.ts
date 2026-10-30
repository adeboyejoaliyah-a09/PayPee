import { describe, expect, it } from 'vitest';
import { calculateDashboardSummary } from './merchant-data';

describe('calculateDashboardSummary', () => {
  it('derives values from orders and stock records', () => {
    const summary = calculateDashboardSummary(
      [
        { amount: 110, status: 'completed' },
        { amount: 220, status: 'pending' },
        { amount: 60, status: 'completed' },
        { amount: 410, status: 'held' },
      ],
      [
        { stock: 12, price: 18 },
        { stock: 2, price: 24 },
        { stock: 40, price: 30 },
      ],
    );

    expect(summary.netSales).toBe(170);
    expect(summary.paidOrders).toBe(2);
    expect(summary.pendingAuthorizations).toBe(1);
    expect(summary.totalInventoryUnits).toBe(54);
    expect(summary.lowStockProducts).toBe(2);
    expect(summary.totalInventoryValue).toBe(12 * 18 + 2 * 24 + 40 * 30);
  });
});
