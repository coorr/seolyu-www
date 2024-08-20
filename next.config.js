const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
}); // 빌드 메모리 분석

module.exports = withBundleAnalyzer({
  compress: true,
  images: {
    domains: ["localhost", "raw.githubusercontent.com"],
  },
  webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === "production";

    return {
      ...config,
      mode: prod ? "production" : "development",
      // devtool: prod && 'hidden-source-map' : 'eval',
      plugins: [...config.plugins],
    };
  },
});
