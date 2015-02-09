var path = require('path');
var webpack = require('webpack');

// Don't use react-hot loader in production
var jsxLoaders = process.env.NODE_ENV === 'production' ? ['6to5-loader'] : ['react-hot', '6to5-loader'];

module.exports = {
  entry: {
    main: ['./src/js/main.jsx'],
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: jsxLoaders },
      { test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer-loader?last 2 version' },
      { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader?includePaths[]=' +
          path.resolve(__dirname, './src/stylesheets') +
          '!autoprefixer-loader?browsers=last 2 version' },
    ],
  },
  noInfo: true,
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: 'build/',
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css', '.scss'],
  },
  target: 'web',
};