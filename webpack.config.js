const HtmlWebpack = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    // in this case, we want to use the webpack-dev-server
    mode: 'development',


    // object to define the output of the webpack config
    output: {
        clean: true, // clean the output folder before building
    },

    // object with the modeule rules
    module: {
        rules: [
            {
                test: /\.html$/, // regex to match the files to be processed
                loader: 'html-loader', // loader to use
                options: {
                    sources: false // disable the source map
                }
            },
            { // rules for the css files
                test: /\.css$/, // regex to match the files to be processed
                exclude: /styles.css$/, // exclude the global css file
                use: ['style-loader', 'css-loader'] // array of loaders to use
            },
            { // rules for the css files
                test: /styles.css$/, // regex to match the files to be processed
                use: [MiniCssExtract.loader, 'css-loader'] // array of loaders to use
            },
            { // rules for the images
                test: /\.(png|jpe?g|gif)$/, // regex to match the files to be processed
                loader: 'file-loader' // loader to use
            }
        ]
    },

    // optimizations obj
    optimization: {},

    // plugins arr
    plugins: [
        new HtmlWebpack({
            filename: 'index.html', // path to the output file
            title: 'Webpack using html-webpack-loader', // title of the page
            template: './src/index.html', // path to the template
        }),
        // add the plugin to minify the css files and set a default name
        new MiniCssExtract({
            filename: '[name].css',
            ignoreOrder: false
        }),
        // add the plugin to copy the assets folder to the dist folder
        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' }
            ]
        })
    ]


}