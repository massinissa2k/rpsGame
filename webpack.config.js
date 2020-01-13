const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './front-src/Main.ts',
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader'
            ]
        }, {
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            use: [
                'ts-loader'
            ],
        }]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js"],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, "src/public")
    },
    plugins: []
};