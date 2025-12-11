import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/KyungeunKim/iotrust-frontend-homework/main/images/**",
      },
    ],
  },
};

export default nextConfig;
