import type { NextConfig } from "next";
import { applyEnvFallbacks } from "./src/lib/env";

applyEnvFallbacks();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
    },
    proxyClientMaxBodySize: "6mb",
  },
};

export default nextConfig;
