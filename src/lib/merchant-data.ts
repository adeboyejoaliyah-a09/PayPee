import { prisma } from './prisma';

export type DashboardSummary = {
  netSales: number;
  paidOrders: number;
  pendingAuthorizations: number;
  heldTransactions: number;
  totalInventoryUnits: number;
  totalInventoryValue: number;
  lowStockProducts: number;
};

export type MerchantDashboardData = {
  orders: Array<{
    id: string;
    customerName: string;
    amount: number;
    status: string;
    createdAt: Date;
    providerOrder?: string | null;
  }>;
  products: Array<{
    id: string;
    name: string;
    sku: string;
    price: number;
    stock: number;
    margin: number | null;
  }>;
  summary: DashboardSummary;
  error?: string;
};

export function calculateDashboardSummary(
  orders: Array<{ amount: number; status: string }>,
  products: Array<{ stock: number; price: number; margin?: number | null }>,
): DashboardSummary {
  const netSales = orders
    .filter((order) => order.status === 'completed')
    .reduce((sum, order) => sum + Number(order.amount), 0);

  const paidOrders = orders.filter((order) => order.status === 'completed').length;
  const pendingAuthorizations = orders.filter((order) => order.status === 'pending').length;
  const heldTransactions = orders.filter((order) => order.status === 'held').length;

  const totalInventoryUnits = products.reduce((sum, item) => sum + Number(item.stock), 0);
  const totalInventoryValue = products.reduce((sum, item) => sum + Number(item.price) * Number(item.stock), 0);
  const lowStockProducts = products.filter((item) => Number(item.stock) <= 25).length;

  return {
    netSales,
    paidOrders,
    pendingAuthorizations,
    heldTransactions,
    totalInventoryUnits,
    totalInventoryValue,
    lowStockProducts,
  };
}

export async function getMerchantDashboardData(): Promise<MerchantDashboardData> {
  try {
    if (!prisma) {
      return {
        orders: [],
        products: [],
        summary: {
          netSales: 0,
          paidOrders: 0,
          pendingAuthorizations: 0,
          heldTransactions: 0,
          totalInventoryUnits: 0,
          totalInventoryValue: 0,
          lowStockProducts: 0,
        },
        error: 'The app is waiting for a valid PostgreSQL DATABASE_URL and DIRECT_URL in .env.local.',
      };
    }

    const [orders, products] = await Promise.all([
      prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          customerName: true,
          amount: true,
          status: true,
          createdAt: true,
          providerOrder: true,
        },
      }),
      prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          sku: true,
          price: true,
          stock: true,
          margin: true,
        },
      }),
    ]);

    const summary = calculateDashboardSummary(
      orders.map((order) => ({ amount: Number(order.amount), status: order.status })),
      products.map((product) => ({ stock: Number(product.stock), price: Number(product.price), margin: product.margin })),
    );

    return {
      orders: orders.map((order) => ({
        ...order,
        amount: Number(order.amount),
      })),
      products: products.map((product) => ({
        ...product,
        price: Number(product.price),
        stock: Number(product.stock),
      })),
      summary,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Database error';
    return {
      orders: [],
      products: [],
      summary: {
        netSales: 0,
        paidOrders: 0,
        pendingAuthorizations: 0,
        heldTransactions: 0,
        totalInventoryUnits: 0,
        totalInventoryValue: 0,
        lowStockProducts: 0,
      },
      error: `Unable to load merchant data from the database. ${message}`,
    };
  }
}
