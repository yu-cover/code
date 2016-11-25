var webpack = require('webpack')
var hotEntry = 'webpack-hot-middleware/client?http://localhost:5130'
var path = require('path')
var entryPath = path.resolve(__dirname, './web/lists')
var distAbsolutePath = path.resolve(__dirname, './dist')
var entryArray = [
  {
    name: 'resizer',
    path: entryPath+ '/resizer/index',
    router: 'resizer'
  },
  {
    name: 'zifuhua',
    path: entryPath+ '/zifuhua/index',
    router: 'zifuhua'
  }
]
module.exports = {
  entry: (function () {
    var map = {}
    entryArray.forEach(function (item) {
      map[ item.name ] = [ hotEntry, item.path + '.js' ]
    })
    console.log(map)
    return map
  })() ,
  output: {
    path: distAbsolutePath,
    filename: "[name].bundle.js",
    publicPath: '/dist'  // web地址，不能用path解析
  },
  // watch: true,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: "style!css"
      },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}