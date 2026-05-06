import { PrismaClient } from "@prisma/client";
import path from "path";
import dotenv from "dotenv";

// Explicitly load .env from the root directory
dotenv.config({ path: path.join(process.cwd(), ".env") });

const globalForPrisma = global;

const databaseUrl = process.env.DATABASE_URL;

console.log("Database URL loaded:", databaseUrl ? "YES (masked)" : "NO");

if (!databaseUrl) {
  throw new Error("DATABASE_URL is missing in .env file");
}

export const prisma = globalForPrisma.prisma || new PrismaClient({
  datasourceUrl: databaseUrl,
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
