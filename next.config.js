// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         remotePatterns: ['github.com', 'lh3.googleusercontent.com'],
//     },
// };

// module.exports = nextConfig
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'github.com',
                pathname: '/**', // Allow all images from GitHub
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '/**', // Allow all images from Googleusercontent
            },
        ],
    },
};

module.exports = nextConfig;
