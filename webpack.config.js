#!/usr/bin/env node
/* eslint-env node */
var path = require('path');
var webpack = require('webpack');

var common = {

    entry: {
        pwa: './src/app.js',
        'sw-notification': './src/serviceworker-notification.js',
        'sw-cache': './src/serviceworker-cache.js'
    },

    resolve: {
        alias: {
            'vue': 'vue/dist/vue.min'
        }
    },

    output: {
        path: path.join(__dirname, 'public'), // Should be public/js, but serviceworker must be in the project root at the moment
        filename: '[name].bundle.js'
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
