const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        // contentBase: "./dist",
        contentBase: ["./src", "./public"], // both src and output dirs
        port: 8080,
        historyApiFallback: true,
        hot: true,
        open: true,
    },
});
