import withPlaiceholder from "@plaiceholder/next";
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
        domains: ['firebasestorage.googleapis.com', 'maps.googleapis.com']
    },
};

export default withPlaiceholder(nextConfig)
