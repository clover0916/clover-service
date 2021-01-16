const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    main: './src/app.js',
    vendor: './src/vendor.js'
  },
  output: {
    path: path.join(__dirname, 'public', 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'style.css',
            },
                },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          {
            loader: 'sass-loader',
            options: {
              // Prefer Dart Sass
              implementation: require('sass'),
      
              // See https://github.com/webpack-contrib/sass-loader/issues/804
              webpackImporter: false,
            },
                },
              ]
      },
      {
        // 追記
        test: /\.(jpg|png)$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      },
    ],
  },
};