/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "olpvsxmuscjzgohdzmsy.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
