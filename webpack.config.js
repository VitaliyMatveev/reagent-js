var path = require('path');
//var webpack = require('webpack');

module.exports = {
  //devtool: 'eval',
  context: path.join(__dirname, './examples'),
  entry: './index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname,'./examples/build')
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
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react'],
              plugins: ['transform-runtime']
            },
            //plugins: ['transform-runtime']
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
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
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
}
