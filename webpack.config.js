const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = [{
  entry: ['./webpack/app.js', './webpack/app.scss'],
  output: {
    path: path.join(__dirname, 'public', 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
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
        use: 'babel-loader',
        loader: {
          presets: ['@babel/preset-env']
        },
      }
    ]
  },
}];