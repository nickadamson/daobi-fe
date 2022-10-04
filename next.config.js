/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  eslint: {
    dirs: ["src"],
  },
  extends: ["plugin:@next/next/recommended"],
};

module.exports = nextConfig;
