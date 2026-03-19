/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for Cloudflare Pages
  output: 'export',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
