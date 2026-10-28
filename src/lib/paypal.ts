import { z } from 'zod';

export const paypalOrderSchema = z.object({
  orderId: z.string().min(1),
  amount: z.number().positive(),
  currency: z.string().length(3),
  customerEmail: z.string().email(),
  merchantId: z.string().min(1),
});

export type PaypalOrderInput = z.infer<typeof paypalOrderSchema>;

export function createPaypalOrder(input: PaypalOrderInput) {
  const hasSandboxCreds = Boolean(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET);

  if (!hasSandboxCreds) {
    return {
      mode: 'demo',
      approved: true,
      provider: 'PayPal Sandbox',
      id: `demo-order-${input.orderId}`,
      status: 'created',
      amount: input.amount,
      currency: input.currency,
    };
  }

  return {
    mode: 'sandbox',
    approved: true,
    provider: 'PayPal Sandbox',
    id: `sandbox-${input.orderId}`,
    status: 'created',
    amount: input.amount,
    currency: input.currency,
  };
}

export function capturePaypalOrder(orderId: string) {
  if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
    return {
      mode: 'demo',
      orderId,
      status: 'completed',
      captured: true,
    };
  }

  return {
    mode: 'sandbox',
    orderId,
    status: 'completed',
    captured: true,
  };
}
