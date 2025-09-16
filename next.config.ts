import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'app.versellbank.com',
        pathname: '/assets/**',
      },
    ],
  },
};

export default nextConfig;
