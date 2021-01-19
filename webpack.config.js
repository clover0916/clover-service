const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    app: ['./src/app.scss', './src/app.js'],
    youtube: './src/youtube.js'
  },
  output: {
    path: path.join(__dirname, 'public', 'dist'),
    filename: '[name].js'
  },
  resolve: {
    fallback: { 
      "stream": require.resolve("stream-browserify"),
      "http": require.resolve("stream-http"),
      "url": require.resolve("url"),
      "buffer": require.resolve("buffer")
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'file-loader',
            options: {
              name: 'style.css',
            },
          },
          { loader: 'extract-loader' },
          {
            loader: 'css-loader',
            options: {
              url: false
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer()
                ]
              }
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
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
        options: {
          presets: ['@babel/preset-env'],
        },
      }
    ],
  },
};