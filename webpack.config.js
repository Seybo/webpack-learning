var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const isProd = process.env.NODE_ENV === 'productuon';
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader'],
  publicPath: '/dist' 
});
var cssConfig = isProd ? cssProd : cssDev;

module.exports = {
  entry: {
    app: './src/app.js', 
    contact: './src/contact.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      { test: /\.scss$/, 
        use: cssConfig
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: 'file-loader?name=images/[name].[ext]'
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    stats: 'errors-only'
    //open: true // to autoopen page on server start
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack learning project',
      //minify: {
        //collapseWhitespace: true
      //},
      hash: true,
      excludeChunks: ['contact'],
      template: './src/index.pug' 
    }),
    new HtmlWebpackPlugin({
      title: 'Contact Page',
      hash: true,
      chunks: ['contact'],
      filename: 'contact.html',
      template: './src/contact.html' 
    }),
    new ExtractTextPlugin({
      filename: "app.css",
      disable: !isProd,
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ]
}
