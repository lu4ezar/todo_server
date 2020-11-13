import { CleanWebpackPlugin } = require('clean-webpack-plugin');
import nodeExternals = require('webpack-node-externals');
import merge = require('webpack-merge');
import webpack = require('webpack');
import path = require('path');

import common = require('./webpack.common');

module.exports = merge.smart(common, {
  devtool: 'inline-source-map',
  entry: ['webpack/hot/poll?1000', path.join(__dirname, 'src/index.ts')],
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
  mode: 'development',
  plugins: [new CleanWebpackPlugin(), new webpack.HotModuleReplacementPlugin()],
  watch: true,
});
