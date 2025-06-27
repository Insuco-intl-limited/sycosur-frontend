/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns:[
      {
        //TODO: add hostname for google drive
        hostname: "",
      }
    ]
  },
}

export default nextConfig
