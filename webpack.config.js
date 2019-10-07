module.exports = (env, argv) => {
  const devMode = argv.mode === 'development';

  return {
    devtool: devMode ? 'nosources-source-map' : 'none',

    entry: "./src/a-l2d.ts",
    output: {
      path: `${__dirname}/docs/js`,
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
    },
    externals: {
      three: 'THREE',
      'pixi.js': 'PIXI'
    }
  };
};
