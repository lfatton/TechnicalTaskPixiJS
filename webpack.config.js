const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const stylesHandler = MiniCssExtractPlugin.loader;

module.exports = {
    entry: './src/main.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ],
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.less$/i,
                use: [stylesHandler, 'css-loader', 'less-loader'],
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devtool: 'source-map',
    devServer: {
        static: path.join(__dirname, './dist'),
        compress: true,
        port: 9000,
    },
};