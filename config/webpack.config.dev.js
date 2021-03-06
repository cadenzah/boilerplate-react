const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (env) => {
  // load environment variables to use
  const envKeys = require('./env')(env)

  // file paths
  const configPath = path.join(__dirname)
  const buildPath = path.join(configPath, '..', 'build')

  const config = {
    entry: ["core-js/stable", "regenerator-runtime/runtime", "./src/index.js"],
    output: {
      publicPath: '/',
      filename: 'js/[name].js',
      path: buildPath
    },
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.(css|sass|scss)$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.(js|jsx)$/,
          exclude: "/node_modules",
          use: ['babel-loader']
        }
      ]
    },
    devServer: {
      contentBase: buildPath,
      compress: true,
      port: 3000,
      historyApiFallback: true,
      hot: true,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HTMLWebpackPlugin({
        template: './public/index.html',
        minify: {
          collapseWhitespace: true
        },
        hash: true
      }),
      new ManifestPlugin({
        fileName: 'manifest.json'
      }),
      new webpack.HotModuleReplacementPlugin(),
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
    ],
  };

  return config
}
  
