const path = require("path");

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "sass-loader" }],
            },
            {
                test: /\.(png|jpg)$/,
                use: [{ loader: "url-loader" }],
            },
        ],
    },
    devServer: {
        port: 8080,
        contentBase: path.resolve(__dirname, "dist"),
        hot: true,
    },
};
