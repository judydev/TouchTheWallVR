const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

var config = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [new HtmlWebpackPlugin({ template: "./index.html" })],
};

module.exports = () => {
    return config;
};
