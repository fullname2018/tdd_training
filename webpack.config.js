const webpack = require('webpack');
const autoprefixer = require('autoprefixer');


module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { modules: true, importLoaders: 1 } },
          { loader: 'postcss-loader' },
        ]
      },
      {
        test: /\.(js|jsx)$/,
        use: [{ loader: 'babel-loader', options: { presets: ['env', 'react', 'stage-2'] } }],
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 8080
  }
};
