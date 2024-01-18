const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const css = require('css-loader');
const cssString = require('css-to-string-loader');
const { optimize } = require('webpack');
module.exports = {
   mode: "production",
   entry: {
      background: path.resolve(__dirname, "..", "src", "background.ts"),
      content: path.resolve(__dirname, "..", "src", "content.ts"),

   },
   output: {
      path: path.join(__dirname, "../dist"),
      filename: "[name].js",
   },
   resolve: {
      extensions: [".ts", ".jsm", ".tsx", ".jsx"],
   },
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: /node_modules/,
         },
         {
            test: /\.css$/,
            use: ["raw-loader"],
            exclude: /node_modules/,
         }
      ]
   },
   plugins: [
      new CopyPlugin({
         patterns: [{from: ".", to: ".", context: "public"}]
      }),
   ],
};
