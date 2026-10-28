export type RiskSignal =
  | 'amount_above_baseline'
  | 'repeat_attempts'
  | 'customer_mismatch'
  | 'unusual_pattern';

export type TransactionSignal = {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  merchant: string;
  repeatedAttempts: number;
  paymentMethod: string;
  riskSignals: RiskSignal[];
};

export function evaluateTransactionRisk(tx: TransactionSignal) {
  let riskScore = 10;

  if (tx.amount > 2500) riskScore += 30;
  if (tx.repeatedAttempts >= 3) riskScore += 30;
  if (tx.riskSignals.includes('amount_above_baseline')) riskScore += 15;
  if (tx.riskSignals.includes('repeat_attempts')) riskScore += 15;
  if (tx.riskSignals.includes('customer_mismatch')) riskScore += 20;
  if (tx.riskSignals.includes('unusual_pattern')) riskScore += 15;

  const severity = riskScore >= 75 ? 'high' : riskScore >= 45 ? 'medium' : 'low';
  const recommendation =
    severity === 'high'
      ? 'verify the payment details and request customer confirmation before proceeding.'
      : 'Monitor the transaction and keep the payment review active.';

  return {
    severity,
    riskScore: Math.min(riskScore, 100),
    recommendation,
    evidence: [
      ...tx.riskSignals,
      tx.repeatedAttempts > 0 ? 'repeat_attempts' : 'stable_pattern',
    ],
  };
}
