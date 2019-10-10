const baseConfig = require("./base.config.js");
const merge = require("webpack-merge");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = merge(baseConfig, {
  devtool: "eval-source-map",
  plugins: [
    new BrowserSyncPlugin({
      files: ["./**/*.php", "./dist/bundle.js", "./dist/bundle.css"],
      reloadDelay: 0,
      proxy: "localhost:8000",
      open: false
    })
  ]
});
