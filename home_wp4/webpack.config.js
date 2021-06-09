const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path")
// const { ModuleFederationPlugin } = require("webpack").container;
//const deps = require("./package.json").dependencies;

module.exports = {
  mode: "production",
  devtool: "eval-cheap-module-source-map",

  devServer: {
    port: 4001,
    contentBase: [
      path.join(__dirname, 'public')
    ],
  },
  output: {
    filename: "main.js"
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
   
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
  ],
};