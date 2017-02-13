var path = require('path');
var webpack = require('webpack');

module.exports = () => ({
  devtool: 'inline-source-map',
  context: path.join(__dirname, './examples'),
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    './index.jsx'
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve( __dirname,'./examples'),
    publicPath: '/'    
  },
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, './examples'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
        enforce: 'pre',
      },
      {
        test: /(\.css|\.less)$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
})
