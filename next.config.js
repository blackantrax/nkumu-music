/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' — full Next.js server required for SSE real-time dashboard
  trailingSlash: false,
  images: { unoptimized: true },
}

module.exports = nextConfig
