import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const businessExists = await prisma.business.findFirst();

  if (businessExists) {
    console.log('Seed skipped: demo business already exists.');
    return;
  }

  const business = await prisma.business.create({
    data: {
      name: 'Northwind Commerce',
      email: 'ops@northwinddemo.com',
    },
  });

  const passwordHash = await bcrypt.hash('demo-password', 10);

  await prisma.user.create({
    data: {
      name: 'Merchant Admin',
      email: 'admin@northwinddemo.com',
      password: passwordHash,
      role: 'merchant',
      businessId: business.id,
    },
  });

  await prisma.product.createMany({
    data: [
      { businessId: business.id, name: 'Classic Tee', sku: 'TEE-01', price: 36, stock: 128, category: 'Apparel', margin: 0.44 },
      { businessId: business.id, name: 'Travel Mug', sku: 'MUG-14', price: 24, stock: 64, category: 'Accessories', margin: 0.31 },
      { businessId: business.id, name: 'Wireless Mouse', sku: 'MOU-77', price: 54, stock: 38, category: 'Electronics', margin: 0.46 },
      { businessId: business.id, name: 'Desk Lamp', sku: 'LAM-09', price: 68, stock: 22, category: 'Home', margin: 0.42 },
    ],
  });

  await prisma.order.createMany({
    data: [
      { businessId: business.id, customerName: 'Ava Thompson', email: 'ava@example.com', amount: 129.99, currency: 'USD', status: 'completed', provider: 'PayPal Sandbox', providerOrder: 'demo-1' },
      { businessId: business.id, customerName: 'Leah Chen', email: 'leah@example.com', amount: 214.5, currency: 'USD', status: 'pending', provider: 'PayPal Sandbox', providerOrder: 'demo-2' },
      { businessId: business.id, customerName: 'Marcus Rivera', email: 'marcus@example.com', amount: 59, currency: 'USD', status: 'completed', provider: 'PayPal Sandbox', providerOrder: 'demo-3' },
      { businessId: business.id, customerName: 'Olivia Park', email: 'olivia@example.com', amount: 394.2, currency: 'USD', status: 'held', provider: 'PayPal Sandbox', providerOrder: 'demo-4' },
    ],
  });

  await prisma.riskFinding.createMany({
    data: [
      { orderId: 'demo-2', severity: 'medium', confidence: 0.74, score: 68, reasons: 'Repeated attempt pattern', recommendation: 'Verify payment details and ask customer to confirm address', status: 'open' },
      { orderId: 'demo-4', severity: 'high', confidence: 0.9, score: 82, reasons: 'High amount and duplicate activity', recommendation: 'Escalate for manual review', status: 'investigating' },
    ],
  });

  await prisma.auditEvent.createMany({
    data: [
      { businessId: business.id, actor: 'merchant-admin', action: 'login', details: 'Successful merchant session opened' },
      { businessId: business.id, actor: 'system', action: 'risk_scan', details: 'Automatic transaction review completed' },
    ],
  });

  console.log('Seed complete');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
