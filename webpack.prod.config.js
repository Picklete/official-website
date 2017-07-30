const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const languages = {
//   'zh-Hant': require('./src/views/locales/zh.json'),
//   'en-US': null
// };

const config = {
  entry: {
    'js/index': ['./src/js/import.js', './src/js/index.js'],
    'js/vendors': ['jquery', 'bootstrap', 'toastr'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: path.resolve(__dirname, '/'),
  },
  context: __dirname,
  devServer: {
    contentBase: './dist',
    port: 8081
    // stats: 'error-only',
    // open: false,
    // compress: false
  },
  resolve: {
    extensions: ['.js', '.json', '.pug', '.css', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.css$/,
        // loader: 'style-loader!css-loader?sourceMap!resolve-url-loader',
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap!resolve-url-loader'
        }),
      },
      {
        test: /\.scss$/,
        // loader: 'style-loader!css-loader?sourceMap!resolve-url-loader!sass-loader?sourceMap',
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap!resolve-url-loader!sass-loader?sourceMap'
        }),
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'file-loader?limit=1024&name=[sha256:hash:base64].[ext]',
            options: {
              outputPath: 'images/'
            }
          },
          {
            loader: 'image-webpack-loader',
            query: {
              progressive: true,
              optimizationLevel: 7,
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=1024&name=[sha256:hash:base64].[ext]',
        options: {
          outputPath: 'plugins/'
        }
      }
    ]
  },
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
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      toastr: 'toastr',
    }),
    new ExtractTextPlugin("stylesheet/index.bundle.css"),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      cache: false,
      template: 'src/views/layouts/index.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'apply_trial.html',
      cache: false,
      template: 'src/views/layouts/apply_trial.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'intro.html',
      cache: false,
      template: 'src/views/layouts/intro.pug'
    }),
    new HtmlWebpackPlugin({
      filename: 'customer_story.html',
      cache: false,
      template: 'src/views/layouts/customer_story.pug'
    }),
  ],
};

module.exports = config;
