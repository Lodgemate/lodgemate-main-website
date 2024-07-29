/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "res.cloudinary.com",
      "upload.wikimedia.org",
      "flagcdn.com",
      "cdn.dummyjson.com",
      "www.image.png",
    ],
  },
};

module.exports = nextConfig;
