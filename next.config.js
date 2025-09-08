/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',  // Enable static export for Netlify
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: true, // Add trailing slash for better Netlify compatibility
}

module.exports = nextConfig