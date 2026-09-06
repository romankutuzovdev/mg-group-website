/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: '**.copart.com' },
      { protocol: 'https', hostname: 'cs.copart.co.uk' },
      { protocol: 'https', hostname: 'c-static.copart.com' },
      { protocol: 'https', hostname: 'images.bid.cars' },
      { protocol: 'https', hostname: 'mercury.bid.cars' },
      { protocol: 'https', hostname: '**.bid.cars' },
      { protocol: 'https', hostname: '**.pages.dev' },
      { protocol: 'https', hostname: '**.workers.dev' },
    ],
  },
};

module.exports = nextConfig;