const merge = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const baseWebpackConfig = require("./webpack.base.config")
const path = require('path')


module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: "/static/"
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, "css-loader"]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../index.html")
    })
  ]
})