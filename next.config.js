/** @type {import('next').NextConfig} */
const nextConfig = {
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
  webpack(config, { dev }) {
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
