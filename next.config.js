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
    // 把所有 /apps/* 和独立作品路径，都让给 public/ 下的静态文件
    // beforeFiles: 在 Next.js 路由之前匹配，强制路由静态 HTML
    async rewrites() {
        return {
            beforeFiles: [
                // 亲子旅游攻略
                { source: '/family-journey', destination: '/family-journey/index.html' },
                { source: '/family-journey/', destination: '/family-journey/index.html' },
                { source: '/family-journey/italy', destination: '/family-journey/italy/index.html' },
                { source: '/family-journey/italy/', destination: '/family-journey/italy/index.html' },
            ],
        };
    },
};

module.exports = nextConfig;
