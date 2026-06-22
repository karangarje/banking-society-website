import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "8e7757megtlyysdg.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
