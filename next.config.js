/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: [
      'ipfs.io',
      'firebasestorage.googleapis.com',
      'oaidalleapiprodscus.blob.core.windows.net',
      '',
    ],
  },
};

module.exports = nextConfig;
