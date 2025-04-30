/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  experimental: {
    optimizeCss: true,
  },
  // Asegurar que PostCSS y Tailwind se procesan correctamente
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
}

module.exports = nextConfig 