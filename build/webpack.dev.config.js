const path = require('path')
const merge = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const baseWebpackConfig = require("./webpack.base.config")


module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    publicPath: "/"
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ["vue-style-loader", "css-loader"]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../index.html")
    })
  ]
})