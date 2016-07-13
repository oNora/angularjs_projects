const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const parts = require('./config/parts');

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist')
};

const common = {

  // Entry accepts a path or an object of entries.
  /**
   * multi vendors example
   * If is a single vendor (react) it is not need a vendor.ts file , just use the name of vendor:
   * vendor: ['react']
   */
  entry: {
    app: PATHS.app
    // vendor: ['./src/vendor.ts']
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {test: /\.ts$/, loader: 'ts-loader'},
      {test: /\.html$/, loader: 'raw'},
      {test: /\.css$/, loader: 'raw'}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.html', '.css']
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: './src/index.html'
      }),
  ]
};


var config;

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(
      common,
      {
        devtool: 'source-map'
      },
      parts.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
      ),
      /**
       * multi vendors example
       * If is a single vendor (react) it is not need a vendor.ts file , just use the name of vendor 
       * another way to define vendors
       * in this case it is only for production
       */
      parts.extractBundle({
        name: 'vendor',
        entries: ['./src/vendor.ts']
      }),
       parts.minify()
    );
    break;
  default:
    config = merge(
      common,
      {
        devtool: 'source-map'
      },
      parts.setFreeVariable(
        'process.env.NODE_ENV',
        'dev'
      ),
      parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT
      })
    );
}

module.exports = validate(config);
