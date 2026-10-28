import { describe, expect, it } from 'vitest';
import { evaluateTransactionRisk } from './risk';

describe('evaluateTransactionRisk', () => {
  it('flags duplicate suspicious activity', () => {
    const result = evaluateTransactionRisk({
      id: 'txn-99',
      amount: 4200,
      currency: 'USD',
      status: 'pending',
      merchant: 'demo-store',
      repeatedAttempts: 3,
      paymentMethod: 'PayPal',
      riskSignals: ['amount_above_baseline', 'repeat_attempts'],
    });

    expect(result.severity).toBe('high');
    expect(result.riskScore).toBeGreaterThanOrEqual(70);
    expect(result.recommendation).toContain('verify');
  });
});
