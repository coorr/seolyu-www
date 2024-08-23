module.exports = {
  presets: ["next/babel"],
  plugins: [process.env.NODE_ENV === "production" && "transform-remove-console"].filter(Boolean), // 필터링하여 `false` 값 제거
};
