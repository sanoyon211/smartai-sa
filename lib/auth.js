import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/db";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: (process.env.NEXT_RUNTIME === "edge" || !prisma)
    ? undefined 
    : prismaAdapter(prisma, {
        provider: "mongodb",
      }),

  session: {
    strategy: "jwt",
  },
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [process.env.BETTER_AUTH_URL],
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  logger: {
    enabled: true,
    level: "debug",
  },
});
