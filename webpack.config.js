const autoprefixer = require('autoprefixer');

module.exports = [{
  entry: './app.scss',
  output: {
    // This is necessary for webpack to compile
    // But we never use style-bundle.js
    filename: 'style-bundle.js',
  },
  devServer: {
    host: '0.0.0.0',
    port: 80,
    disableHostCheck: true
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
              sassOptions: {
                includePaths: ['./node_modules']
              },
              // Prefer Dart Sass
              implementation: require('sass'),
          
              // See https://github.com/webpack-contrib/sass-loader/issues/804
              webpackImporter: false,
            }
          },
        ]
      }
    ]
  },
}];