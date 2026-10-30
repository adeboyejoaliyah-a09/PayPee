import { PrismaClient } from '@prisma/client';

const databaseUrl = process.env.DATABASE_URL ?? '';
const isValidPostgresUrl = databaseUrl.startsWith('postgres://') || databaseUrl.startsWith('postgresql://');

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient | null;
};

export const prisma = isValidPostgresUrl
  ? (globalForPrisma.prisma ?? new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
    }))
  : null;

if (process.env.NODE_ENV !== 'production' && prisma) {
  globalForPrisma.prisma = prisma;
}
