import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // HSTS only when serving over HTTPS — harmless on HTTP origins, but kept prod-only to avoid
  // accidentally pinning a local dev tunnel.
  ...(isProd
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]
    : []),
];

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      // Add allowed external image domains here:
      // {
      //   protocol: "https",
      //   hostname: "example.com",
      // },
    ],
  },
  typescript: {
    tsconfigPath: "./tsconfig.app.json",
  },
  turbopack: {},
  headers: async () => [
    {
      source: "/:path*",
      headers: securityHeaders,
    },
  ],
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
