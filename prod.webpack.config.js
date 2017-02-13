var path = require('path');
var webpack = require('webpack');

module.exports = (env) => ({
  entry: {
    Form: './src/Form'
  },
  output: {
    filename: '[name]/index.js',
    path: path.resolve( __dirname,'./dist'),
    publicPath: '/',
    library: 'reagents-js/[name]',
    libraryTarget: 'umd',
    umdNamedDefine: true
    //sourceMapFilename: '[name].map'
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
