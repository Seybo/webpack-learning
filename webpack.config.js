const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      { test: /\.scss$/, 
        use: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: ['css-loader', 'sass-loader'],
          publicPath: '/dist' 
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack learning project',
      //minify: {
        //collapseWhitespace: true
      //},
      hash: true,
      template: './src/index.html', // Load a custom template (ejs by default see the FAQ for details)
    }),
    new ExtractTextPlugin({
      filename: "app.css",
      allChunks: true
    })
  ]
}
