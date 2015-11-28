var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    context: __dirname,

    entry: './assets/js/index',

    output: {
        path: path.resolve('./assets/bundles/'),
        filename: "[name]-[hash].js"
    },

    plugins: [
        new BundleTracker({filename: './webpack-stats.json'})
    ],

    module: {
        //postLoaders: [
        //    {
        //        test: /\.js$/, // include .js files
        //        exclude: /node_modules/, // exclude any and all files in the node_modules folder
        //        loader: "jshint-loader"
        //    }
        //],

        loaders: [
            {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'},  // to transform JSX into JS
            {test: /\.css$/, loader: "style!css"}
        ]
    },

    // more options in the optional jshint object
    jshint: {
        // jshint errors are displayed by default as warnings
        // set emitErrors to true to display them as errors
        emitErrors: false,

        // jshint to not interrupt the compilation
        // if you want any file with jshint errors to fail
        // set failOnHint to true
        failOnHint: true
    },

    resolve: {
        modulesDirectories: ['node_modules', 'bower_components'],
        extensions: ['', '.js', '.jsx']
    }
};
