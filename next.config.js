/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'res.cloudinary.com', 'lh3.googleusercontent.com'],
    },
    staticPageGenerationTimeout: 100,
    rewrites:[
        {
            source: '/',
            destination: 'http://likho.site/:path*',
            has: [
                {
                    type: 'host',
                    value: 'likho.site'
                },
                {
                    type: 'host',
                    value: 'localhost'
                },
            ]
        }
    ]
}

module.exports = nextConfig
