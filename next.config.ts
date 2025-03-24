import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    turbo: {
      resolveAlias: {
        "@vercel/turbopack-next/internal/font/google/font": require.resolve(
          "next/dist/build/webpack/loaders/next-font-loader/index.js"
        ),
      },
    },
  },
};

export default nextConfig;
