import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  serverExternalPackages: ["@prisma/client"],
  transpilePackages: ["next-mdx-remote"],
};

// export default withSerwist(nextConfig);
export default nextConfig;
