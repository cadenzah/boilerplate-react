const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
    const { MODE } = process.env;
    const isDev = MODE === 'development';

    // load environment variables to use
    const envKeys = require('./env')(env);

    // file paths
    const configPath = path.join(__dirname); // path for webpack.config.js
    const rootPath = path.join(configPath, '..');
    const buildPath = path.join(rootPath, 'build');
    const srcPath = path.join(rootPath, 'src');

    // Base Configuration Option
    let config = {
        entry: [
            "core-js/stable",
            "regenerator-runtime/runtime",
            `${srcPath}/index.js`
        ],
        output: {
            publicPath: '/',
            filename: 'js/[name].[chunkhash].js',
            path: buildPath,
        },
        resolve: {
            extensions: [".js", ".jsx"],
            alias: {
                '@': srcPath,
            },
        },
        mode: isDev ? 'development' : 'production',
        module: {
            rules: [
                {
                    test: /\.(css|sass|scss)$/,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: "/node_modules",
                    use: ['babel-loader'],
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HTMLWebpackPlugin({
                template: './public/index.html',
                minify: isDev && {
                    collapseWhitespace: true,
                    removeComments: true,
                    minifyJS: true,
                },
                hash: isDev,
            }),
            new WebpackManifestPlugin({
                fileName: 'manifest.json',
            }),
            new CopyWebpackPlugin({
            // Inject static assets into public directory
            // To access them in your component,
                // put them in `public/` directory in whichever form - directories, files
                // and use them with the url which has prefix `assets/`.
            // See the example usage
                patterns: [
                    {
                        from: 'public/assets',
                        to: './assets',
                        toType: 'dir',
                    },
                ],
            }),
            new webpack.DefinePlugin(envKeys.stringified),
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
        ],
    };

    if (MODE === 'development') {
        // for DEVELOPMENT BUILD
        config = {
            devtool: 'inline-source-map',
            devServer: {
                static: {
                    directory: buildPath,
                },
                compress: true,
                port: 3000,
                historyApiFallback: true,
                hot: true,
            },
            plugins: config.plugins.concat([
                new webpack.HotModuleReplacementPlugin(),
            ]),
            ...config,
        };
    } else {
        // for PRODUCTION BUILD
        config = {
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    }
                },
            },
        },
        ...config,
        };
    }

    return config;
};
