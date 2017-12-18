const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

module.exports = {
  entry: {
    bundle: './src/index'
  },
  output: {
    path: path.resolve(__dirname),
    filename: '[name].js'
  },
  devServer: {
    port: 8080,
    hot: false,
    // contentBase: '/',
    // inline: true
    historyApiFallback: true,
    // publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      minChunks: 3
    })
  ]
};