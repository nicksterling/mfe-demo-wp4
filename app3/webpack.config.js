const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
//const deps = require("./package.json").dependencies;

module.exports = {
  mode: "production",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    port: 4003,
    writeToDisk: true,
  },
  output: {
    publicPath: "auto",
    // path: path.join(__dirname, '../app1/public/mfe/app3')
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "app3",
      filename: "remoteEntry.js",
      exposes: {
        './App': './src/App.Singlespa'
      },
      remotes: {},
      shared: {
        react: {
          singleton: true,
        },
        "react-dom": {
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
  ],
};