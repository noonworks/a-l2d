module.exports = (env, argv) => {
  const devMode = argv.mode === 'development';
  const buildLib = env && env.lib;

  const entry = buildLib ? './src/l2d/index.ts' : './src/a-l2d.ts';
  const output =
    buildLib ? {
      path: `${__dirname}/dist`,
      filename: 'a-l2d-lib.js',
      library: 'AL2DLIB',
      libraryTarget: 'var'
    } : {
      path: `${__dirname}/docs/js`,
      filename: 'a-l2d.js'
    };
  const config = buildLib ? 'tsconfig.lib.json' : 'tsconfig.json';

  return {
    devtool: devMode ? 'nosources-source-map' : 'none',

    entry: entry,
    output: output,
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: config
              }
            }
          ]
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
