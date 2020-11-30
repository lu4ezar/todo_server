import path from 'path';

export default {
  module: {
    rules: [
      {
        exclude: [path.resolve(__dirname, 'NODE_MODULES')],
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  target: 'node',
};
