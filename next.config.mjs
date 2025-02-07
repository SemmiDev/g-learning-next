/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  productionBrowserSourceMaps: false, // Disable source maps in development
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.vultrobjects.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.drive.google.com',
        port: '',
        pathname: '**',
      },
    ],
  },
  devIndicators: {
    appIsrStatus: false,
  },
  experimental: {
    // esmExternals: false,
    serverActions: {
      bodySizeLimit: '500mb',
    },
  },
};

export default nextConfig;
