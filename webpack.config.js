const devCerts = require("office-addin-dev-certs");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');

module.exports = async (env, options)  => {
  const dev = options.mode === "development";
  const config = {
    devtool: "source-map",
    entry: {
    vendor: [
        'react',
        'react-dom',
        'core-js',
        'office-ui-fabric-react'
    ],
    polyfill: 'babel-polyfill',
    // taskpane: [
    //   'react-hot-loader/patch',
    //   './src/taskpane/index.js',
    // ],
    taskpane: './src/taskpane/index.js',
    rolo: './src/rolo/index.js',
    homeroom: './src/homeroom/index.js',
    commands: './src/commands/commands.js',
    dashboard: './src/dashboard/index.js',
    request: './src/request/index.js'
    // other: './src/other/index.js'
    },
    resolve: {
      extensions: [".ts", ".tsx", ".html", ".js", "jsx"]
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: [
              'react-hot-loader/webpack',
              'babel-loader',
          ],
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          use: {
              loader: 'file-loader',
              query: {
                  name: 'assets/[name].[ext]'
                }
              }  
            }   
          ]
    },    
    plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            to: "taskpane.css",
            from: "./src/taskpane/taskpane.css"
          }
        ]
      }),
      new ExtractTextPlugin('[name].[hash].css'),
      new HtmlWebpackPlugin({
        filename: "taskpane.html",
          template: './src/taskpane/taskpane.html',
          chunks: ['taskpane', 'vendor', 'polyfill']
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            to: "homeroom.css",
            from: "./src/homeroom/homeroom.css"
          }
        ]
      }),
      new HtmlWebpackPlugin({
        filename: "homeroom.html",
          template: './src/homeroom/homeroom.html',
          chunks: ['homeroom', 'polyfill']
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            to: "rolo.css",
            from: "./src/rolo/rolo.css"
          }
        ]
      }),
      new HtmlWebpackPlugin({
        filename: "rolo.html",
          template: './src/rolo/rolo.html',
          chunks: ['rolo', 'vendor', 'polyfill']
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            to: "request.css",
            from: "./src/request/request.css"
          }
        ]
      }),
      new HtmlWebpackPlugin({
        filename: "request.html",
          template: './src/request/request.html',
          chunks: ['request', 'vendor', 'polyfill']
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            to: "dashboard.css",
            from: "./src/dashboard/dashboard.css"
          }
        ]
      }),
      new HtmlWebpackPlugin({
        filename: "dashboard.html",
          template: './src/dashboard/dashboard.html',
          chunks: ['dashboard', 'polyfill']
      }),
      // new CopyWebpackPlugin({
      //   patterns: [
      //     {
      //       to: "other.css",
      //       from: "./src/other/other.css"
      //     }
      //   ]
      // }),
      // new HtmlWebpackPlugin({
      //   filename: "other.html",
      //     template: './src/other/other.html',
      //     chunks: ['other', 'vendor', 'polyfill']
      // }),
      new HtmlWebpackPlugin({
          filename: "commands.html",
          template: "./src/commands/commands.html",
          chunks: ["commands"]
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            to: "assets",
            from: "./assets",
            globOptions: {
              ignore: ['*scss']
            }
          }
        ]
      }),
      new webpack.ProvidePlugin({
        Promise: ["es6-promise", "Promise"]
      })
    ],
    devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*"
      },      
      https: (options.https !== undefined) ? options.https : await devCerts.getHttpsServerOptions(),
      port: process.env.npm_package_config_dev_server_port || 3000
    }
  };

  return config;
};
