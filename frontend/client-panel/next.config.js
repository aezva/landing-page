/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@context': require('path').resolve(__dirname, './context'),
      '@components': require('path').resolve(__dirname, './components'),
      '@services': require('path').resolve(__dirname, './services'),
    };
    return config;
  },
}

module.exports = nextConfig