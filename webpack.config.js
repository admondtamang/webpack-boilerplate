const path = require("path");

const regeneratorRuntime = require("regenerator-runtime");

module.exports = {
    entry: ["@babel/polyfill", "./src/index.js"],
    mode: "development",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
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

    devServer: {
        historyApiFallback: true,
    },

    devServer: {
        port: 8080,
        contentBase: path.resolve(__dirname, "dist"),
        hot: true,
    },
};
