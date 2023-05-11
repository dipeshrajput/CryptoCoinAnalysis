const { hostname } = require("os");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { hostname: "cdn.coinranking.com" },
      { hostname: "assets.coingecko.com" },
    ],
  },
};

module.exports = nextConfig;
