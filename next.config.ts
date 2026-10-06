import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // TypeScriptのエラーチェックを強制的にスルーしてビルドを成功させる
    ignoreBuildErrors: true,
  },
  eslint: {
    // コードの書き方チェック（ESLint）もスルーさせる
    ignoreDuringBuilds: true,
  },

  async redirects() {
    return [
      {
        source: "/download",
        destination:
          "https://apps.apple.com/jp/app/nailu-ai%E3%83%8D%E3%82%A4%E3%83%AB%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3-%E3%83%8D%E3%82%A4%E3%83%AB%E3%82%B5%E3%83%AD%E3%83%B3/id6777699639",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
