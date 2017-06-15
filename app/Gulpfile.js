const gulp = require('gulp');
const path = require('path');
const gutil = require('gulp-util');
const webpack = require('webpack');

const isProduction = gutil.env.production;

const electron = require('electron-connect').server.create();

function build(watch, callback) {
  const plugins = [new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(isProduction
      ? 'production'
      : 'development'),
  })];

  if (isProduction) {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
  }

  webpack({
    plugins,
    cache: true,
    watch,
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.jsx', '.json', '.js'],
    },
    devtool: '#source-map',
    entry: path.resolve(__dirname, 'src/js/app.jsx'),
    output: {
      filename: 'app.js',
      path: path.resolve(__dirname, 'data/js'),
    },
  }, () => {
    if (callback) {
      callback();
    }
  });
}

gulp.task('js', (callback) => {
  build(false, callback);
});

gulp.task('watch', () => {
  build(true);
});

gulp.task('build', ['js']);
gulp.task('dev', ['build', 'watch', 'electron']);
gulp.task('default', ['build']);

gulp.task('electron', () => {
  // Start browser process
  electron.start();
  // Restart browser process
  gulp.watch('main.js', electron.restart);
  // Reload renderer process
  gulp.watch(['data/**/*'], electron.reload);
});
