import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
} as any;

// export default withSerwist(nextConfig);
export default nextConfig;
