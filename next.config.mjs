/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@prisma/client"],

  turbopack: {
    resolveAlias: {
      "@prisma/client": { edge: false },
      "better-auth/adapters/prisma": { edge: false },
    },
  },
};

export default nextConfig;