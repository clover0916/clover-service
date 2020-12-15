const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = [{
  entry:'./webpack/app.js',
  mode: 'production',
  output: {
    path: path.join(__dirname, 'public', 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      // CSSファイルを書き出すオプションを有効にする
      {
        loader: MiniCssExtractPlugin.loader,
      },
      // CSSをバンドルするための機能
      {
        loader: "css-loader",
        options: {
          // オプションでCSS内のurl()メソッドの取り込まない
          url: false,
          // ソースマップの利用有無
          sourceMap: true,
          // Sass+PostCSSの場合は2を指定
          importLoaders: 2,
        },
      },
      // PostCSSのための設定
      {
        loader: "postcss-loader",
        options: {
          // PostCSS側でもソースマップを有効にする
          sourceMap: true,
          postcssOptions: {
            // ベンダープレフィックスを自動付与する
            plugins: ["autoprefixer"],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          // linkタグに出力する機能
          "style-loader",
          {
            loader: "css-loader",
            options: {
              // オプションでCSS内のurl()メソッドの取り込みを禁止する
              url: false,
              // ソースマップの利用有無
              sourceMap: enabledSourceMap,
          
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2
            }
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require('sass'),
              
              // See https://github.com/webpack-contrib/sass-loader/issues/804
              webpackImporter: false,
              sassOptions: {
                          includePaths: ['./node_modules']
              },
            },
          },
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        },
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
  target: ["web", "es5"]
}];