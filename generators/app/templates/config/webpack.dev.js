const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

module.exports = function () {
    return webpackMerge(commonConfig, {
        mode: 'development',

        module: {
            rules: [
                /**
                 * Rule to support SASS pre-processor.
                 *
                 * Add ability to import CSS from JS code.
                 * CSS will be injected automatically to DOM using <style> tag.
                 *
                 * See: https://webpack.js.org/loaders/css-loader/
                 *      https://webpack.js.org/loaders/style-loader/
                 *      https://webpack.js.org/loaders/sass-loader/
                 */
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: ['style-loader', {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }]
                }
            ]
        },

        /**
         * Webpack Development Server configuration
         * Description: The webpack-dev-server is a little node.js Express server.
         * The server emits information about the compilation state to the client,
         * which reacts to those events.
         *
         * See: https://webpack.github.io/docs/webpack-dev-server.html
         */
        devServer: {
            port: 3000,
            https: true
        }
    });
};
