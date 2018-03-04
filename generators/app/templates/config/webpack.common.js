/**
 * Webpack plugins
 */
const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line import/no-extraneous-dependencies
const path = require('path');

module.exports = {
    entry: {
        main: './src/app/app.js'
    },

    module: {
        rules: [
            /**
             * Babel loader in order to support ES6 features.
             * A Babel 'ENV' preset can automatically determine the Babel plugins and polyfills you need
             * based on your supported environments.
             *
             * See: https://webpack.js.org/loaders/babel-loader/
             *      https://github.com/babel/babel-preset-env
             */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['env', {
                            targets: {
                                IE: 11
                            },
                            modules: false
                        }]]
                    }
                }
            },

            /**
             * Raw loader support for *.stache
             * Returns file content as string
             *
             * See: https://webpack.js.org/loaders/raw-loader/
             */
            {
                test: /\.stache$/,
                exclude: /node_modules/,
                use: 'raw-loader'
            },

            /**
             * File loader for supporting images, fonts, for example, in CSS files.
             *
             * See: https://webpack.js.org/loaders/file-loader/
             */
            {
                test: /\.(woff|woff2|eot|ttf|otf|png|jpg|gif)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]'
                    }
                }
            },

            /**
             * SVG loader for supporting svg, for example, in CSS/HTML files.
             * Generates sprite from required SVG files.
             * SVGO loader to optimize / minifie SVG file.
             *
             * See: https://github.com/kisenka/svg-sprite-loader
             * See: https://github.com/rpominov/svgo-loader
             */
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                use: 'svg-sprite-loader'
            }
        ]
    },

    plugins: [
        /*
         * Plugin: HtmlWebpackPlugin
         * Description: Simplifies creation of HTML files to serve your webpack bundles.
         * This is especially useful for webpack bundles that include a hash in the filename
         * which changes every compilation.
         *
         * See: https://github.com/ampedandwired/html-webpack-plugin
         */
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            chunksSortMode: 'manual',
            chunks: ['main'],
            inject: 'body',
            hash: true
        })
    ]
};
