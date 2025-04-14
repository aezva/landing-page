const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['aezva.com'],
  },
}

module.exports = withNextIntl(nextConfig); 