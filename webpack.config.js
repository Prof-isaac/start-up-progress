const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => {
  return {
    entry: "./src/App.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js"
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: "babel-loader",
          exclude: /node_modules/
        },
        {
          test: /\.(sa|sc|c)ss$/,

          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        }
      ]
    },

    plugins: [
      new HtmlWebPackPlugin({
        template: "./public/index.html"
      }),
      new MiniCssExtractPlugin({ filename: "[name].bundle.css" })
    ]
  };
};
