/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/quan-ly/:path*",
        destination: "/api/middleware",
      },
    ];
  },
};

export default nextConfig;
