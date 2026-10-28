import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createPaypalOrder } from '@/lib/paypal';

const schema = z.object({
  orderId: z.string().min(1),
  amount: z.number().positive(),
  currency: z.string().length(3),
  customerEmail: z.string().email(),
  merchantId: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const payload = schema.parse(await req.json());
    const order = createPaypalOrder(payload);
    return NextResponse.json({ ok: true, order });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Invalid order payload' }, { status: 400 });
  }
}
