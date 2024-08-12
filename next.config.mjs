/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async () => {
        return [
            {
                source: '/',
                destination: '/omdb',
                permanent: false,
            },
        ];
    },
    reactStrictMode: true,
    swcMinify: true,
    webpack: (config, context) => {
        // Enable polling based on env variable being set
        if(process.env.NEXT_WEBPACK_USEPOLLING) {
            config.watchOptions = {
                poll: 500,
                aggregateTimeout: 300
            }
        }
        return config
    },
    images: {
      domains: ['m.media-amazon.com'],
    },
}

export default nextConfig;
