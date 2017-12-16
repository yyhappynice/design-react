const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
  devtool: 'source-map',
  entry: {
    main: './example/index.js',
    vendor: ['react', 'react-dom', 'react-router-dom', 'classnames', 'marked', 'prismjs']
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
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js', minChunks: Infinity }),
    new CompressionPlugin({
      test: /\.(ttf|js|html)$/
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './example/index.html',
      filename: 'index.html',
    }),
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

if(process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      // 最紧凑的输出
      beautify: false,
      // 删除所有的注释
      comments: false,
      compress: {
        //supresses warnings, usually from module minification
        warnings: false,
        // 删除所有的 `console` 语句
        // 还可以兼容ie浏览器
        drop_console: true,
      }
    })
  )
}
