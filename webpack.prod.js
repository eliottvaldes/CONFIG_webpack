const HtmlWebpack = require('html-webpack-plugin')
const MiniCssExtract = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");


const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');

module.exports = {

    mode: "production",

    output: {
        clean: true,
        // add a hash to the file name to avoid caching
        filename: 'main.[contenthash].js'
    },


    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            // add a rule for css files
            {
                test: /\.css$/,
                // exclude: /styles\.css$/, due to it's a global css
                exclude: /styles.css$/,
                use: ['style-loader', 'css-loader']
            },
            // add rule to process styles.css in a global way
            {
                test: /styles.css$/,
                use: [MiniCssExtract.loader, 'css-loader']
            },
            // add a rule to load images
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader'
            },
            // Add a rule to use babel-loader
            // this code is pasted from the babel-loader documentation
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },

    // optimization of the code to production adding the minimizers
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(), // to minify css
            new Terser(), // to minify js
        ]
    },

    plugins: [
        new HtmlWebpack({
            title: 'Mi Webpack App',
            // filename: 'index.html',
            template: './src/index.html'
        }),

        // Implement to minimize the CSS code
        new MiniCssExtract({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),

        // Implement to copy the assets folder that contains the images
        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' }
            ]
        })
    ]
}


