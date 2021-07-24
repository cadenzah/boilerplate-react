const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
    // load environment variables to use
    const envKeys = require('./env')(env);

    // file paths
    const configPath = path.join(__dirname); // path for webpack.config.js
    const rootPath = path.join(configPath, '..');
    const buildPath = path.join(rootPath, 'docs');
    const srcPath = path.join(rootPath, 'src');

    const config = {
        entry: [
            'core-js/stable',
            'regenerator-runtime/runtime',
            `${srcPath}/index.js`
        ],
        output: {
            filename: 'js/[name].[chunkhash].js',
            path: buildPath,
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                '@': srcPath,
            },
        },
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    }
                }
            }
        },
        mode: 'production',
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
                inject: true,
                filename: 'index.html',
                template: './public/gh-pages/index.ejs',
                basename: envKeys.raw.REPO_URL[envKeys.raw.REPO_URL.length - 1] === '/' 
                        ? envKeys.raw.REPO_URL
                        : `${envKeys.raw.REPO_URL}/`,
                minify: {
                    collapseWhitespace: true,
                    removeComments: true,
                    minifyJS: true,
                },
                hash: true,
            }),
            new HTMLWebpackPlugin({
                inject: false,
                filename: '404.html',
                template: './public/gh-pages/404.html',
                minify: {
                    collapseWhitespace: true,
                    removeComments: true,
                    minifyJS: true,
                },
                hash: true,
            }),
            new WebpackManifestPlugin({
                fileName: 'manifest.json'
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

    return config;
};
