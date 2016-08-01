var webpack = require("webpack");  
var path = require("path");

var config = { 
  context: path.join(__dirname, "Src"), 
  entry: "./Scripts/App.js",
  output: {
    path: __dirname + "/Src",
    filename: "Bundle.js"
  },
  module: {
    loaders: [
      {test: /\.js?$/, exclude: /node_modules/, loader: "react-hot"},
      {test: /\.js?$/, exclude: /node_modules/, loader: "babel", query: {presets: ["es2015", "react"]}},
      {test: /\.(js|jsx|es6)$/, include: /react-pivot/, loader: "babel", query: {presets: ["es2015", "react"]}},
      {test: /\.css$/, loader: "style!css"},
      {test: /\.png$/, loader: "url-loader?mimetype=image/png" }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env':{
    //     'NODE_ENV': JSON.stringify('production')
    //   }
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress:{
    //     warnings: true
    //   }
    // })   
  ]
};

module.exports = config;