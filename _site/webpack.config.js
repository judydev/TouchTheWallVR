const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const webpack = require("webpack");

// module.exports = (env) => {
//     // Use env.<YOUR VARIABLE> here:
//     // console.log("Goal: ", env.goal); // 'local'
//     // console.log("Production: ", env.production); // true

//     return {
//         // mode: "development",
//         entry: "./src/index.js",
//         output: {
//             filename: "bundle.js",
//             path: path.resolve(__dirname, "dist"),
//         },
//         // plugins: [new HtmlWebpackPlugin({ template: "./dist/index.html" })],
//         devServer: {
//             contentBase: "/dist",
//             // hot: true,
//         },
//     };
// };

var config = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [new HtmlWebpackPlugin({ template: "./dist/index.html" })],
    // devServer: {
    //     contentBase: "/dist",
    //     // hot: true,
    // },
};

module.exports = (env, argv) => {
    if (argv.mode === "development") {
        config.devtool = "source-map";
    }

    if (argv.mode === "production") {
        //...
    }

    return config;
};
