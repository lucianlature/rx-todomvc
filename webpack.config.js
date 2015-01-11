var dotenv = require("dotenv");

dotenv.load();

var env = process.env.NODE_ENV || "development";
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");
var webpack = require("webpack");

var plugins = [
    new HtmlWebpackPlugin({
        title: "Rx + React • TodoMVC",
        template: "src/index.html",
        env: env
    }),
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify(env)
        }
    })
];

var entry = ["./src/index.js"];
var jsLoaders = ["6to5"];

if (env === "production") {
    plugins.push(
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );
}

if (process.env.DEV_HOTSWAP) {
    var host = process.env.DEV_SERVER_HOST;
    var port = process.env.DEV_SERVER_PORT;

    entry.splice(0, 0,
        "webpack-dev-server/client?http://" + host + ":" + port,
        "webpack/hot/dev-server");

    jsLoaders.unshift("react-hot");
    plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
}

module.exports = {
    entry: entry,

    output: {
        filename: env === "production" ? "index.[hash].js" : "index.js",
        path: path.resolve("dist")
    },

    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loaders: jsLoaders },
            { test: /\.css$/, loader: "style!css" },
            { test: /\.png$/, loader: "url?mimetype=image/png&limit=10000" },
            { test: /\.(eot|ttf|svg)$/, loader: "file" },
            { test: /\.woff$/, loader: "url?mimetype=application/font-woff&limit=10000" }
        ]
    },

    externals: {
        "react": "React",
        "react/addons": "React",
        "rx": "Rx"
    },

    plugins: plugins,

    devtool: "source-map"
};
