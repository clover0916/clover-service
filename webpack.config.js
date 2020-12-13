const autoprefixer = require('autoprefixer');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = [{
  entry: ['./webpack/app.js', './webpack/app.scss'],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  target: 'node',
    node: {
      // Need this when working with express, otherwise the build fails
      __dirname: false, // if you don't put this is, __dirname
      __filename: false, // and __filename return blank or /
    },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'bundle.css',
            },
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
               plugins: () => [autoprefixer()]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),

              // See https://github.com/webpack-contrib/sass-loader/issues/804
              webpackImporter: false,
              sassOptions: {
                includePaths: ['./node_modules']
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/, /routes/],
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
}];