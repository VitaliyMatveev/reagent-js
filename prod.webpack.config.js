var path = require('path');
var webpack = require('webpack');

module.exports = () => ({
  entry: './index.js',
  context: path.join(__dirname, './src'),
  output: {
    filename: 'main.bundle.js',
    publicPath: '/',
    library: 'reagents-js/form',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    path: path.join(__dirname, './dist'),
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
  externals: [
    'react',
    'react-dom',
    /material-ui\/*/,
    'draft-js'
  ],
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
   ]
})
