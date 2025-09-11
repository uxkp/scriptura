/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["fra.cloud.appwrite.io"],
  },
  experimental: {
    turbo: false,
    webpackBuildWorker: true,
  },
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
