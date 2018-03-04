const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const webpackMerge = require('webpack-merge'); // eslint-disable-line import/no-extraneous-dependencies
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev
const utils = require('./utils');

/**
 * Webpack Plugins
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const UglifyJSPlugin = require('webpack/lib/optimize/UglifyJsPlugin'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = function () {
    return webpackMerge(commonConfig, {
        /**
         * Options affecting the output of the compilation.
         *
         * See: https://webpack.js.org/configuration/output/
         */
        output: {
            /**
             * The output directory as absolute path (required).
             *
             * See: https://webpack.js.org/configuration/output/#output-path
             */
            path: utils.root('dist'),

            /**
             * This option determines the name of each output bundle.
             *
             * See: https://webpack.js.org/configuration/output/#output-filename
             */
            filename: '[name].bundle.js'
        },

        module: {
            rules: [
                /**
                 * Extract and compile SCSS files from .src/styles directory to external CSS file
                 *
                 * See: https://webpack.js.org/loaders/sass-loader/#in-production
                 */
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: ExtractTextPlugin.extract({
                        use: ['css-loader', 'sass-loader'],
                        fallback: 'style-loader'
                    })
                }
            ]
        },

        plugins: [
            /**
             * Plugin: DefinePlugin
             * Description: The DefinePlugin allows you to create global constants which can be configured at compile time.
             * This can be useful for allowing different behavior between development builds and release builds.
             *
             * See: https://webpack.js.org/plugins/define-plugin/
             */
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),

            /**
             * Plugin: ExtractTextPlugin
             * Description: Extracts imported CSS files into external stylesheet
             *
             * See: https://webpack.js.org/plugins/extract-text-webpack-plugin/
             */
            new ExtractTextPlugin('[name].css'),

            /**
             * Plugin: UglifyJsPlugin
             * Description: Minimize all JavaScript output of chunks.
             * Loaders are switched into minimizing mode.
             *
             * See: https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
             */
            new UglifyJSPlugin()
        ]
    });
};
