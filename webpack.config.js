var path = require('path');
var webpack = require('webpack');

module.exports = {
  //devtool: 'eval',
  context: path.join(__dirname, './examples'),
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    './index.jsx'
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve( __dirname,'./examples/build')
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
        use: [
          {
            loader: 'react-hot-loader'
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react', 'stage-0'],
              plugins: ['transform-runtime']
            }
          }
        ],
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
    new webpack.HotModuleReplacementPlugin()
  ]
}
