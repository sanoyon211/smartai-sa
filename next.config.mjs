/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  },
  webpack: (config, { isServer, nextRuntime }) => {
    if (isServer && nextRuntime === "edge") {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@prisma/client": false,
        "better-auth/adapters/prisma": false,
      };
    }
    return config;
  },

};


export default nextConfig;
