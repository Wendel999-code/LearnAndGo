import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  experimental: {
    serverActions: {
      bodySizeLimit: "3mb",
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      //   {
      //     protocol: "https",
      //     hostname: "images.pexels.com",
      //   },
      //   {
      //     protocol: "https",
      //     hostname: "randomuser.me",
      //   },
    ],
  },
};

export default nextConfig;
