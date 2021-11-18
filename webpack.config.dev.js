const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: '[name]-bundle.[contenthash:10].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        open: true,
        contentBase: path.resolve(__dirname, 'public')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/templates/template.html"
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ['@babel/preset-env', '@babel/preset-react'] }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
}