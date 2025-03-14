import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'avatar.vercel.sh',
      },
      {
        hostname: 'lh3.googleusercontent.com',
      },
      {
        hostname: 'genrivia.s3.ap-south-1.amazonaws.com',
      },
      {
        hostname: 'genrivia.vercel.app',
      },
    ],
  },
};

export default nextConfig;
