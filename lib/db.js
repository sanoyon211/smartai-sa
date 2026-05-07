import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

export const prisma =
  process.env.NEXT_RUNTIME === "edge" || !process.env.DATABASE_URL
    ? undefined
    : globalForPrisma.prisma ??
      new PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
      });

if (process.env.NODE_ENV !== "production" && process.env.NEXT_RUNTIME !== "edge") {
  globalForPrisma.prisma = prisma;
}