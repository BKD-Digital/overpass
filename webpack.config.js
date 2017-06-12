'use strict'

let webpack = require('webpack'),
  path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  glob = require('glob');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || '3000';

const config = {
  entry:{
    app: path.resolve(__dirname, './src/js/app.js'),
    modules: glob.sync('./src/js/components/*.js'),
    styles: path.resolve(__dirname, './src/styles/main.scss')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['es2015'] }
          }
        ]
      }, {
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            }]
        }
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, './src'),
    proxy: {
      '/api/event': 'http://localhost:4200'
    },
    noInfo: true,
    hot: false,
    inline: true,
    historyApiFallback: true,
    port: PORT,
    host: HOST
  },

  plugins: [
    new HtmlWebpackPlugin({ template: path.join(path.join(__dirname, 'src'), 'index.html') })
  ]
}

module.exports = config
