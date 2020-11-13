import { CleanWebpackPlugin } = require('clean-webpack-plugin');
import { merge } = require('webpack-merge');
import nodeExternals = require('webpack-node-externals');
import path = require('path');

import common = require('./webpack.common');

module.exports = merge(common, {
  devtool: 'source-map',
  entry: [path.join(__dirname, 'src/index.ts')],
  externals: [nodeExternals({})],
  mode: 'production',
  plugins: [new CleanWebpackPlugin()],
});
