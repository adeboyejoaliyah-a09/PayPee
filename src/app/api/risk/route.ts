import { NextResponse } from 'next/server';
import { z } from 'zod';
import { evaluateTransactionRisk } from '@/lib/risk';

const payloadSchema = z.object({
  id: z.string(),
  amount: z.number().positive(),
  currency: z.string().length(3),
  status: z.enum(['pending', 'completed', 'failed']),
  merchant: z.string(),
  repeatedAttempts: z.number().min(0),
  paymentMethod: z.string(),
  riskSignals: z.array(z.enum(['amount_above_baseline', 'repeat_attempts', 'customer_mismatch', 'unusual_pattern'])),
});

export async function POST(req: Request) {
  try {
    const body = payloadSchema.parse(await req.json());
    const result = evaluateTransactionRisk(body);
    return NextResponse.json({ ok: true, result });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Invalid risk payload' }, { status: 400 });
  }
}
