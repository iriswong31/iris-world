/** @type {import('next').NextConfig} */
const nextConfig = {
    // 允许来自 blob 的图片，虽然我们可能主要用 base64
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
};

module.exports = nextConfig;
