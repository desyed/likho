/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'res.cloudinary.com', 'lh3.googleusercontent.com'],
    },
    staticPageGenerationTimeout: 100,
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://www.likho.site/:path*',
            },
        ]
    },
}

module.exports = nextConfig
