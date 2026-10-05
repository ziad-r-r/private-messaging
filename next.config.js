/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  images: { unoptimized: true },
  experimental: {
    serverComponentsExternalPackages: ["bcryptjs", "@prisma/client", "prisma"]
  }
};

module.exports = nextConfig;
