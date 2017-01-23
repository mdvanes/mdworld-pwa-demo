#!/usr/bin/env node
/* eslint-env node */
var path = require('path');
var webpack = require('webpack');
var StyleLintPlugin = require('stylelint-webpack-plugin');

var common = {

    entry: {
        pwa: './src/app.js',
        serviceworker: './src/serviceworker/serviceworker.js'
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
        new StyleLintPlugin({
            configFile: '.stylelintrc',
            files: ['src/**/*.scss']
        }),
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
