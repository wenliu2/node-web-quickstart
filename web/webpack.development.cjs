// development config
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.cjs");
const { resolve } = require("path");
//const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = merge(commonConfig, {
  mode: "development",
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "../client-dist"),
    publicPath: "/static",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(scss|sass)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    hot: true, // enable HMR on the server
    historyApiFallback: {
      //true, // fixes error 404-ish errors when using react router :see this SO question: https://stackoverflow.com/questions/43209666/react-router-v4-cannot-get-url
      index: "/static/"
    },
    port: 9000,
    static: {
      directory: resolve(__dirname, '../client-dist'),
      publicPath: "/static"
    },
    proxy: {
      '/api': 'http://localhost:3001',
    }
  },
  devtool: "cheap-module-source-map",
  //plugins: [new ReactRefreshPlugin()],
});