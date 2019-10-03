module.exports = {
  mode: "production",
  // mode: "development",
  // devtool: 'nosources-source-map',

  entry: "./src/index.ts",
  output: {
    path: `docs/js`,
    filename: "a-l2d.js"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts"]
  }
};
