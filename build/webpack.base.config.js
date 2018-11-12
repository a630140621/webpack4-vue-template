const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const CommonsChunkPlugin = require('webpack').optimize.CommonsChunkPlugin
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin")


module.exports = {
  entry: {
    inside: path.resolve(__dirname, '../src/inside/main.js'),
    outside: path.resolve(__dirname, '../src/outside/main.js')
  },
  output: {
    filename: 'js/[name].js'
  },
  module: {
    rules: [{
        test: /\.vue$/,
        use: ["vue-loader"]
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 10000,
            name: 'images/[name].[hash:7].[ext]' // 将图片都放入 images 文件夹下，[hash:7]防缓存
          }
        }]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 10000,
            name: 'fonts/[name].[hash:7].[ext]' // 将字体放入 fonts 文件夹下
          }
        }]
      }
    ]
  },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        'inside-vendor': {
          test: /[\\/]inside[\\/]/,
          name: 'inside-vendor',
          chunks: 'all'
        },
        'outside-vendor': {
          test: /[\\/]outside[\\/]/,
          name: 'outside-vendor',
          chunks: 'all'
        },
        'vendor': {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    // inside， outside 各自拥有的模块
    // new CommonsChunkPlugin({
    //   name: 'inside-vendor',
    //   chunks: ['inside'],
    //   minChunks: function (module) {
    //     return module.context && module.context.indexOf("node_modules") !== -1;
    //   }
    // }),
    // new CommonsChunkPlugin({
    //   name: 'outside-vendor',
    //   chunks: ['outside'],
    //   minChunks: function (module) {
    //     return module.context && module.context.indexOf("node_modules") !== -1;
    //   }
    // }),
    // // 提取公共模块
    // new CommonsChunkPlugin({
    //   name: 'vendor',
    //   chunks: ['inside-vendor', 'outside-vendor']
    // }),
    // // 提取 vendor 中 webpack 模块加载部分代码
    // new CommonsChunkPlugin({
    //   name: 'manifest',
    //   chunks: ['vendor']
    // }),
    // 提取 css
    // new ExtractTextPlugin({
    //   allChunks: true,
    //   filename: "css/[name].css?[contenthash:8]"
    // }),
    // 生成入口首页
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, `../dist/inside/index.html`),
      template: path.resolve(__dirname, `../src/inside/index.html`),
      chunks: ['vendor', 'inside-vendor', 'inside'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, `../dist/outside/index.html`),
      template: path.resolve(__dirname, `../src/outside/index.html`),
      chunks: ['vendor', 'outside-vendor', 'outside'],
      inject: true
    })
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, '..', 'src'),
      inside: path.resolve(__dirname, '..', 'src', 'inside'),
      outside: path.resolve(__dirname, '..', 'src', 'outside'),
    }
  },
}