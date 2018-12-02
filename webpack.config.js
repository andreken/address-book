const HtmlWebpackPlugin = require('html-webpack-plugin');
const json = require('./node_modules/country-list/data.json');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        /* Used to manage json data on country-list module */
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test:/\.css$/,
        exclude: /node_modules/,
        loaders: ['style','css']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new UglifyJSPlugin()
  ],
  devServer: {
    host: "localhost",
    port: 8080,
    open: true
  },    
};
