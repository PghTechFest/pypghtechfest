var webpack = require('webpack');
module.exports = {
  entry: [
    "./app/js/app.js"
  ],
  output: {
    path: __dirname + '/app/static',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js?$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      { test: /\.css$/, loader: "style!css" }
    ]
  },
  devtool: 'source-map',
  plugins: [
  ]
};
