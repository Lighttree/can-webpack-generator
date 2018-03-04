const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

/**
 * Webpack Plugins
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { LicenseWebpackPlugin } = require('license-webpack-plugin');

module.exports = function () {
    return webpackMerge(commonConfig, {
        mode: 'production',

        module: {
            rules: [
                /**
                 * Extract and compile SCSS files to external CSS file
                 *
                 * See: https://webpack.js.org/loaders/sass-loader/#in-production
                 */
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: ExtractTextPlugin.extract({
                        use: ['css-loader?minimize', 'sass-loader'],
                        fallback: 'style-loader'
                    })
                }
            ]
        },

        plugins: [
            /**
             * Plugin: ExtractTextPlugin
             * Description: Extracts imported CSS files into external stylesheet
             *
             * See: https://webpack.js.org/plugins/extract-text-webpack-plugin/
             */
            new ExtractTextPlugin('[name].css'),

            /**
             * Plugin: LicenseWebpackPlugin
             * Description: finds all 3rd party libraries, and outputs the licenses in your webpack build directory.
             *
             * See: https://github.com/xz64/license-webpack-plugin
             */
            new LicenseWebpackPlugin({
                pattern: /.*/,
                includePackagesWithoutLicense: true,
                addBanner: true
            })
        ]
    });
};
