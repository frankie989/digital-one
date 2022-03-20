const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require("css-minimizer-webpack-plugin");


module.exports = (env, {mode}) => {

    const isDev = mode === 'development'

    return {
        mode: mode,
        entry: './app/app.js',
        output: {
            path: path.join(__dirname, 'assets'),
            filename: "bundle.js"
        },
        devServer: {
            hot: true,
            open: true,
            port: 3000,
            watchFiles: "frontend/app/index.html"
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: {
                        loader: "babel-loader",
                    }
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[ext]',
                    },
                },
                {
                    test: /\.p?css$/i,
                    use: [
                        isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    config: './postcss.config.js'
                                }
                            }
                        }
                    ]
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                inject: 'body'
            }),
            new MiniCssExtractPlugin({
                filename: 'styles/[name].css'
            })
        ],
        optimization: {
            minimizer: [
                new OptimizeCSSAssetsPlugin({})
            ]
        }
    };
}