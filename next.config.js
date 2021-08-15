const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
  pwa: {
    dest: "public",
    runtimeCaching,
  },
  reactStrictMode: true,
  typescript: { ignoreDevErrors: true },
  pageExtensions: ["page.tsx", "page.ts"],
});
