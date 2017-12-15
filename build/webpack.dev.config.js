const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: {
    main: './example/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../docs'),
    filename: '[name].js'
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
        enforce: 'pre',
        options: {
          eslint: {
            configFile: '.eslintrc.yml'
          }
        }
      },
      {
        test: /\.(js|jsx)$/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }],
        exclude: /(node_modules)/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8000,
            name: '[name].[ext]'
          }
        }]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?t=\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }]
      },
      {
        test: /\.md$/,
        use: 'raw-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './example/index.html',
      filename: 'index.html',
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.json']
  },
  devServer: {
    port: 9000,
    hot: true,
    compress: true,
    disableHostCheck: true,
    stats: { colors: true }
  }
}