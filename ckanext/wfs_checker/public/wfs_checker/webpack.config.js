var path = require('path');
const webpack = require("webpack");

const config = {
  devServer: {
   contentBase: path.join(__dirname, '/'),
   compress: true,
   port: 9000
 },
  entry: `${ __dirname }/src/main.js`,
  output: {
    filename: 'bundle.js',
    path: `${ __dirname }/`
  },module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        // Exposes jQuery for use outside Webpack build
        test: require.resolve('jquery'),
        use: [{
            loader: 'expose-loader',
            options: 'jQuery'
          }, {
            loader: 'expose-loader',
            options: '$'
          }]
      },
    {
      test: /\.(png|jp(e*)g|svg)$/,
      exclude: /(node_modules|bower_components)/,
      use: [
      {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']  //Preset used for env setup
        }
      },
      {
        loader: 'url-loader',
        options: {
            limit: 8000, // Convert images < 8kb to base64 strings
            name: 'images/[hash]-[name].[ext]'
          }
      }]
    }
  ]
  },node: {
  fs: 'empty'
},
  mode: 'production'
};

module.exports = config;