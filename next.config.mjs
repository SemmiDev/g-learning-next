/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  productionBrowserSourceMaps: false, // Disable source maps in development
  images: {
    // domains: ['drive.google.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.vultrobjects.com',
        port: '',
        pathname: '**',
      },
    ],
  },

  experimental: {
    esmExternals: false,
  },
};

export default nextConfig;
