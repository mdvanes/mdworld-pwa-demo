#!/usr/bin/env node
var path = require('path');
//var merge = require('webpack-merge');
var webpack = require('webpack');

var common = {

    entry: './src/app.js',

    resolve: {
        alias: {
            'vue': 'vue/dist/vue.min'
        }
    },

    output: {
        path: path.join(__dirname, 'public/js'),
        filename: 'pwa.bundle.js'
    },

    // Add source maps
    devtool: 'source-map',

    // Add minification
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            exclude: [
                /node_modules/
            ]
        })
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader', 'eslint-loader']
            }
        ]
    }
};

module.exports = common;
