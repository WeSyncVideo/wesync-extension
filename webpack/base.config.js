const merge = require('webpack-merge')
const path = require('path')

const root = (...paths) => path.resolve(__dirname, '..', ...paths)
const src = (...paths) => root('src', ...paths)

module.exports = () => merge({
  entry: {
    foreground: src('foreground.ts'),
    background: src('background.ts'),
  },
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
    ],
    alias: {
      core: src('core', 'src'),
      commonActions: src('actions/common/src'),
      chromeActions: src('actions/chrome/src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [{
          loader: 'tslint-loader',
          options: {
            configFile: root('tslint.json'),
            tsConfigFile: root('tsconfig.json'),
            typeCheck: true,
          }
        }]
      },
      {
        test: /\.tsx?$/,
        use: [{
            loader: 'babel-loader',
            options: {
              babelrc: true,
            },
          },
          {
            loader: 'ts-loader'
          },
        ]
      },
    ],
  },
})
