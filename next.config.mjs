/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: false,
    productionBrowserSourceMaps: false, // Disable source maps in development
    optimizeFonts: false, // Disable font optimization
    images: {
        // domains: ['drive.google.com'],
        remotePatterns: [
            {
              protocol: "https",
              hostname: "*.vultrobjects.com",
              port: "",
              pathname: "**",
            },
          ],
    },
};

export default nextConfig;
