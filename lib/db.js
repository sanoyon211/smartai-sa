import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma ?? (process.env.NEXT_RUNTIME === "edge" ? {} : prismaClientSingleton());

export { prisma };

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;