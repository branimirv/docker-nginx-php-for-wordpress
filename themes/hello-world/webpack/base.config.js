const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: ["./src/scripts/index.js", "./src/styles/style.scss"],
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.js"
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "bundle.css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader"
          },
          {
            /** For Slick Slider */
            loader: "resolve-url-loader"
          },
          {
            /** For resolve-url-loader: source maps must be enabled on any preceding loader */
            loader: "sass-loader?sourceMap"
          }
        ]
      },
      {
        // Now we apply rule for images
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            // Using file-loader for these files
            loader: "file-loader",

            // In options we can set different things like format
            // and directory to save
            options: {
              publicPath: path.resolve(__dirname, "../dist/")
            }
          }
        ]
      }
    ]
  },
  externals: {
    // @note provided by WordPress
    jquery: "jQuery"
  }
};
