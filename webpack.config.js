module.exports = (env, argv) => {
  const devMode = argv.mode === 'development';
  const buildLib = env && env.lib;

  const entry = buildLib ? './src/l2d/index.ts' : './src/a-l2d.ts';
  const outName = buildLib ? 'a-l2d-lib.js' : 'a-l2d.js';
  const outDir = buildLib ? '/dist' : '/docs/js';
  const config = buildLib ? 'tsconfig.lib.json' : 'tsconfig.json';

  return {
    devtool: devMode ? 'nosources-source-map' : 'none',

    entry: entry,
    output: {
      path: `${__dirname}` + outDir,
      filename: outName
    },
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
