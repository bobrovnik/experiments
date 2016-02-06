var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {index: './index.js'},
    output: { path: __dirname, filename: 'build/[name].js' },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            }
        ]
    }
};