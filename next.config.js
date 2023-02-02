/** @type {import('next').NextConfig} */

const removeImports = require('next-remove-imports')();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  }
};

module.exports = removeImports(nextConfig);
