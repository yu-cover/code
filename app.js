var express = require('express');
var app = express();
var path = require('path')
var webpack = require('webpack')
var webpackConfig = require('./webpack.config');
var hotMidware = require("webpack-hot-middleware");
var port = 5130
var compiler = webpack(webpackConfig);

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: false, 
    publicPath: webpackConfig.output.publicPath,
    reload: true
}));
app.use(hotMidware(compiler));
app.use(express.static(path.resolve(__dirname)))

app.listen(port, function (a,b,c) {
  console.log('app is listening at port ' + port)
})