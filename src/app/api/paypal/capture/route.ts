import { NextResponse } from 'next/server';
import { z } from 'zod';
import { capturePaypalOrder } from '@/lib/paypal';

const schema = z.object({
  orderId: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const payload = schema.parse(await req.json());
    const order = capturePaypalOrder(payload.orderId);
    return NextResponse.json({ ok: true, order });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Invalid capture payload' }, { status: 400 });
  }
}
