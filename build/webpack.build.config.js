const fs = require('fs')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

const fileNameTransfer = fileName => fileName.match(/[A-Z][a-z]*/g).map((e) => e).join('-')
const generateEntrys = () => {
  let packages = fs.readdirSync('src')
  let entrys = {
    'index': path.resolve(__dirname, '../src/index.js'),
  }
  if(packages) {
    packages.forEach((e) => {
      if(fs.statSync(`src/${e}`).isDirectory()) {
        entrys[fileNameTransfer(e)] = path.resolve(__dirname, `../src/${e}/index.js`)
      }
    })
    return entrys
  }
}

module.exports = {
  entry: generateEntrys(),
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: '[name]/index.js',
    library: 'design-react',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.scss$/,
        //use: ['style-loader', 'css-loader?modules&localIdentName=[local]-[hash:base64:5]', 'sass-loader']
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  externals: {'react': 'React', 'react-dom': 'ReactDOM', 'react-router': 'ReactRouter'},
  plugins: [
    new ExtractTextPlugin({
      filename: '[name]/style.css',
      allChunks: true
    }),
    new ExtractTextPlugin({
      filename: 'app.css',
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  }
}