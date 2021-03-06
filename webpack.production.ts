import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { merge } from 'webpack-merge';
import nodeExternals from 'webpack-node-externals';
import path from 'path';

import common from './webpack.common';
import { Configuration } from 'webpack';

export default merge<Configuration>(common, {
  devtool: 'source-map',
  entry: [path.join(__dirname, 'src/index.ts')],
  externals: [nodeExternals({})],
  mode: 'production',
  plugins: [new CleanWebpackPlugin()],
});
