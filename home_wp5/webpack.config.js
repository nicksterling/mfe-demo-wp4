const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
//const deps = require("./package.json").dependencies;

module.exports = {
  mode: "production",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    port: 4000,
  },
  output: {
    publicPath: "auto",
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
      name: "home_wp5",
      filename: "remoteEntry.js",
      exposes: {},
      remotes: {
        "app2": "app2@http://localhost:4002/remoteEntry.js",
        "app3": "app3@http://localhost:4003/remoteEntry.js"
      },
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