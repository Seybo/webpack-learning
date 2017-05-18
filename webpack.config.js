var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

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
        //use: ExtractTextPlugin.extract({
          //fallback: 'style-loader',
          //use: ['css-loader', 'sass-loader'],
          //publicPath: '/dist' 
        //}) // doesn't work with Hot Module Replacement
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.pug$/,
        loaders: ['html-loader', 'pug-html-loader']
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
      disable: true,
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ]
}
