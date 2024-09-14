/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://lcl-hackathon-e10-sbox-d6db.ew.r.appspot.com/:path*',
      },
    ];
  },
};

export default nextConfig;
