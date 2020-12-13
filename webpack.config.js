const autoprefixer = require('autoprefixer');
var nodeExternals = require('webpack-node-externals');

module.exports = [{
  target: 'node',
  externals: [nodeExternals()],
  entry: ['./webpack/app.js', './webpack/app.scss'],
  output: {
    filename: 'bundle.js',
    path: __dirname + 'public/dist'
  },
  mode: "development",
  devServer: {
    port: process.env.PORT || 5000,
    host: '0.0.0.0',
    open: true,
  },
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
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env']
        },
      }
    ]
  },
}];