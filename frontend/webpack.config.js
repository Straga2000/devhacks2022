const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinPlugin = require("imagemin-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');


module.exports = {
    // optimization: {
    //     splitChunks: {
    //         name: false,
    //         cacheGroups: {
    //             default: false,
    //             commons: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: "vendor",
    //                 chunks: "all"
    //             }
    //         }
    //     },
    //     nodeEnv: 'production',
    //     minimize: true,
    //     minimizer: [new TerserPlugin()],
    // },
    plugins: [
        // new webpack.ContextReplacementPlugin(
        //     /moment[\/\\]locale$/,
        //     /de|en/
        // ),
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify('production')
        // }),
        // new MiniCssExtractPlugin({
        //     filename: '[name].bundle.css',
        //     chunkFilename: '[id].css'
        // }),
        // new ImageMinPlugin({
        //     test: /\.(jpe?g|png|gif)$/i
        // }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/images'),
                    to: path.resolve(__dirname, 'public/images')
                }
            ]
        }),
        // new BundleAnalyzerPlugin()
    ],
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'public'),
        // filename: 'bundle.js',
        publicPath: '/'
    },
    devtool: 'source-map',
    devServer: {
        server: 'https',
        static: path.resolve(__dirname, 'public'),
        open: true,
        port: 3000,
        historyApiFallback: true,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                issuer: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: 'url-loader'
                    }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                issuer: /\.(jsx|js)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][name]-[hash].[ext]',
                    }}]
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(woff|woff2|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                        },
                    },
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {loader: "style-loader",},
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            importLoaders: 2,
                            esModule:false
                        }
                    },
                    {
                        loader: "resolve-url-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: { sourceMap: true }
                    }
                ],
                exclude: "/node_modules"
            },
            {
                test: /\.txt$/,
                use: 'raw-loader'
            },
            {
                test: /\.(jsx|js)$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                "targets": "defaults",
                                "modules": false,
                                "loose": true
                            }],
                            '@babel/preset-react'
                        ]
                    }
                }]
            },

            {
                test: /\.svg$/,
                issuer: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: 'svg-url-loader'
                    }],
            },
            {
                test: /\.svg$/,
                issuer: /\.(jsx|js)$/i,
                use: [{
                        loader: '@svgr/webpack',
                        options: {
                                svgoConfig: {
                                    plugins: [
                                        // {
                                        //     removeViewBox: false
                                        // }
                                    ]
                                }
                            }
                        },
                        {
                            loader: 'url-loader'
                        }],
            },
        ]
    }
};
