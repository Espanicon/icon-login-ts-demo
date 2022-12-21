// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = [
  {
    mode: "development",
    devtool: "inline-source-map",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "main.js"
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, "./dist")
      }
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          use: ["file-loader"]
        }
      ]
    },
    resolve: {
      extensions: [".jsx", ".js", ".tsx", ".ts"],
      fallback: {
        buffer: require.resolve("buffer/")
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"]
      }),
      new HtmlWebpackPlugin({
        title: "Output",
        myPageHeader: "web tests",
        template: "./src/index.html",
        filename: "./index.html"
      })
    ]
  }
];
