/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['calm-actor-864a39d720.media.strapiapp.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'calm-actor-864a39d720.media.strapiapp.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
