/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: false,
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
