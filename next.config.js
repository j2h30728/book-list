/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/books",
        destination: "https://books-api.nomadcoders.workers.dev/lists",
      },
      {
        source: "/api/books/:id",
        destination: "https://books-api.nomadcoders.workers.dev/list?name=:id",
      },
    ];
  },
  images: {
    domains: ["storage.googleapis.com"],
  },
};
module.exports = nextConfig;
