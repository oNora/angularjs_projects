module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      {pattern: './src/specs.ts', watched: false}
    ],
    preprocessors: {
      './src/specs.ts': ['webpack']
    },
    webpack: {
      module: {
        loaders: [
          {test: /\.ts$/, loader: 'ts'},
          {test: /\.html$/, loader: 'raw'},
          {test: /\.css$/, loader: 'raw'}
        ]
      },
      resolve: {
        extensions: ['', '.js', '.ts', '.html', '.css']
      }
    },
    webpackMiddleware: { stats: 'errors-only' },
    browsers: ['Chrome']
  });
};
