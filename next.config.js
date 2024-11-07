/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "raw.githubusercontent.com",
      "www.notion.so",
    ],
  },
};

module.exports = nextConfig;
