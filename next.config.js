/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'res.cloudinary.com', 'lh3.googleusercontent.com'],
    },
    staticPageGenerationTimeout: 100,

}

module.exports = nextConfig
