const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack learning project',
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      template: './src/index.html', // Load a custom template (ejs by default see the FAQ for details)
    })
  ]
}
