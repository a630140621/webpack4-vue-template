const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')


module.exports = {
  entry: path.resolve(__dirname, '../src/inside/main.js'),
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
  plugins: [
    new VueLoaderPlugin()
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, '..', 'src'),
      inside: path.resolve(__dirname, '..', 'src', 'inside'),
      outside: path.resolve(__dirname, '..', 'src', 'outside'),
    }
  },
  // entry: {
  //   inside: path.resolve(__dirname, './src/inside/main.js'),
  //   outside: path.resolve(__dirname, './src/outside/main.js')
  // },
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   publicPath: '/static/',
  //   filename: '[name].js'
  // }
}