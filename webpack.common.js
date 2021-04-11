const path = require("path");

const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
    entry: ["@babel/polyfill", "./src/index.js"],
    // mode: "development",
    output: {
        // `filename` provides a template for naming your bundles (remember to use `[name]`)
        filename: "[name].bundle.js",
        // `chunkFilename` provides a template for naming code-split bundles (optional)
        chunkFilename: "[name].bundle.js",
        path: path.resolve(__dirname, "./dist"),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
            {
                // Apply rule for .sass, .scss or .css files
                test: /\.(sa|sc|c)ss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|eot|ttf|svg|gif|woff|jpg)$/,
                use: ["url-loader"],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        splitChunks: {
            cacheGroups: {
                common: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "common",
                    chunks: "all",
                },
            },
        },
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: "disabled",
        }),
        new HtmlWebpackPlugin({
            template: "template.html",
        }),
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
        }),
    ],
};
