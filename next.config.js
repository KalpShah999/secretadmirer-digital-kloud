module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://127.0.0.1:3002/api/:path*', // Proxy to Backend
        },
      ]
    },
    // output: "server",
    reactStrictMode: false,
    async redirects() {
      return [
        {
          source: '/favicon.ico',
          destination: '/logo_1.png',
          permanent: false,
        },
      ]
    },
  }