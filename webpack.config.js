#!/usr/bin/env node
var path = require('path');
var merge = require('webpack-merge');
var webpack = require('webpack');

var common = {

    entry: './src/app.js',

    resolve: {
        alias: {
            'vue': 'vue/dist/vue'
        }
    },

    output: {
        path: path.join(__dirname, 'public/js'),
        filename: 'pwa.bundle.js'
    },

    devtool: 'source-map',

    // Add minification
    //plugins: [
    //    new webpack.optimize.UglifyJsPlugin()
    //],

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
};

module.exports = common;
