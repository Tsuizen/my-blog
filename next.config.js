/** @type {import('next').NextConfig} */

const removeImports = require('next-remove-imports')();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: true
};

module.exports = removeImports(nextConfig);
