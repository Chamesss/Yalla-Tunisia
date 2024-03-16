/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    experimental: {
        serverComponentsExternalPackages: ["lz4"],
    },
    images: {
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "robohash.org",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
