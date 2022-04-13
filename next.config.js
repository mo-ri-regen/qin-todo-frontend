const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const isProd = process.env.NODE_ENV === "production";

module.exports = withPWA({
  pwa: {
    dest: "public",
    runtimeCaching,
    disable: isProd ? false : true,
  },
  reactStrictMode: true,
  typescript: { ignoreDevErrors: true },
  pageExtensions: ["page.tsx", "page.ts"],
  images: {
    domains: [
      'https://firebasestorage.googleapis.com/v0/b/clerk-projects.appspot.com/o/user%2FEZN9sL51EDRMueJlLfuNfZ8n3kJ3%2Fsetting%2Fprofile%2FEZN9sL51EDRMueJlLfuNfZ8n3kJ3?alt=media&token=37c4142f-5df8-4ada-8bb5-09c72f49ed60) on `next/image`, hostname "firebasestorage.googleapis.com',
    ],
  },
});
