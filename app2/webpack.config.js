const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
//const deps = require("./package.json").dependencies;

module.exports = {
  mode: "production",
  devtool: "eval-cheap-module-source-map",
  devServer: {
    port: 4002,
  },
  externals: {
    React: 'react',
    ReactDOM: 'react-dom'
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
      name: "app2",
      filename: "remoteEntry.js",
      exposes: {
        './App' : './src/App.singlespa'
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