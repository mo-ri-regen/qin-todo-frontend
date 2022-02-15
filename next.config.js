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
});
