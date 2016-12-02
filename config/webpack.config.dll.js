const webpack = require('webpack');

const vendors = [
  'redux',
  'react-redux',
  'react-router-redux',
  'moment',
];

module.exports = {
  output: {
    path: 'build',
    filename: '[name].[chunkhash].js',
    library: '[name]_[chunkhash]',
  },
  entry: {
    vendor: vendors,
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'config/manifest.json',
      name: '[name]_[chunkhash]',
      context: __dirname,
    }),
  ],
};
