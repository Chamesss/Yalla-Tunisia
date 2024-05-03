import withPlaiceholder from "@plaiceholder/next";
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    experimental: {
        serverComponentsExternalPackages: ["lz4"],
    },
    images: {
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "robohash.org",
                port: "",
                pathname: "/**",
            },
        ],
        domains: ['firebasestorage.googleapis.com', 'maps.googleapis.com', 'ui-avatars.com']
    },
};

export default withPlaiceholder(nextConfig)
