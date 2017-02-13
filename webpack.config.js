var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
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
  //   // preLoaders: [
  //   //   {
  //   //     test: /\.jsx?$/,
  //   //     loaders: ['eslint']
  //   //   }
  //   // ],
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
        enforce: 'pre',
      },
  //     {
  //       test: /\.less$/,
  //       loader: 'style!css!less'
  //     },
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
  //     {
  //       test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
  //       loader: 'file?name=[path][name].[ext]'
  //     },{
  //       test: /\.json$/,
  //       loader: 'json'
  //     }
  //   ]
  // },
  // resolve: {
  //   root: path.resolve(__dirname, './app/frontend')
  // }
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}
