import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/fiyatlar",
        destination: "/sistemini-olustur",
        permanent: true,
      },
      {
        source: "/pricing",
        destination: "/sistemini-olustur",
        permanent: true,
      },
      {
        source: "/paketinizi-bulun",
        destination: "/sistemini-olustur",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
