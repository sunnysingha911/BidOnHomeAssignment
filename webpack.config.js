const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")

const PATH_SRC_DIRECTORY = path.join(__dirname, "src")
const PATH_DIST_DIRECTORY = path.join(__dirname, "dist")

module.exports = {
  mode: "development",
  entry: [path.join(PATH_SRC_DIRECTORY, "./index.js")],
  output: {
    path: PATH_DIST_DIRECTORY,
    filename: "js/[name].[contenthash].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_module/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    contentBase: PATH_DIST_DIRECTORY,
    host: "localhost",
    port: "3000",
    open: true,
    historyApiFallback: true,
    overlay: {
      error: true,
      warning: true,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(PATH_SRC_DIRECTORY, "./index.html"),
    }),
    new CleanWebpackPlugin(),
  ],
}
