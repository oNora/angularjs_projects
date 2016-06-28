var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: './src/main.js',
  output: {
    path: './dist',
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel'},
      {test: /\.html$/, loader: 'raw'},
      {test: /\.css$/, loader: 'raw'}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.html', '.css']
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: './src/index.html'
      }),
      new webpack.DefinePlugin({
        app: {
          envirenment: JSON.stringify(process.env.APP_ENVIRENMENT || 'dev')
        }
      })
  ]
  
};
