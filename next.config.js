/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'res.cloudinary.com', 'lh3.googleusercontent.com'],
    },
    // experimental: {
    //     serverComponentsExternalPackages: ['cloudinary', 'graphql-request'],
    // }
}

module.exports = nextConfig
