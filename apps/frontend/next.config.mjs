/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  webpack: (config, { dev, isServer }) => {
    if (!isServer) {
      config.devtool = dev ? 'eval-source-map' : 'source-map'
    }
    return config
  },
}

export default nextConfig
