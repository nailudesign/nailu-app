import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{
      source: "/download",
      destination: "https://apps.apple.com/jp/app/id6777699639",
      permanent: false,
    }];
  },
};

export default nextConfig;
