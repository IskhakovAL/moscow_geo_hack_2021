const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

const filename = (ext) => (isDevelopment ? `[name].${ext}` : `[name].[hash].${ext}`);

const optimization = () => {
    const config = {
        runtimeChunk: isDevelopment,
        splitChunks: {
            chunks: 'all',
        },
    };

    if (isProduction) {
        config.minimizer = [new OptimizeCssAssetWebpackPlugin(), new TerserWebpackPlugin()];
    }

    return config;
};

const getPlugins = () => {
    const plugins = [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.png',
        }),
        new MiniCssExtractPlugin({
            filename: '[name][hash].css',
            chunkFilename: '[id][hash].css',
        }),
        new CleanWebpackPlugin(),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru/),
    ];

    if (isDevelopment) {
        plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new ForkTsCheckerWebpackPlugin({
                async: true,
                typescript: {
                    diagnosticOptions: {
                        semantic: true,
                        syntactic: true,
                    },
                    configOverwrite: {
                        compilerOptions: {
                            noUnusedLocals: false,
                        },
                    },
                },
                logger: { infrastructure: 'silent', issues: 'console', devServer: true },
            }),
        );
    }

    return plugins;
};
const babelOptions = (...presets) => {
    const opts = {
        presets: ['@babel/preset-env'],
        plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-optional-chaining',
        ],
    };

    if (presets) {
        for (const preset of presets) {
            opts.presets.push(preset);
        }
    }

    return opts;
};

const jsLoaders = (...presets) => {
    const loaders = [
        'cache-loader',
        'thread-loader',
        {
            loader: 'babel-loader',
            options: babelOptions(...presets),
        },
    ];

    if (isDevelopment) {
        // loaders.push('eslint-loader');
    }

    return loaders;
};

const PROXY_HOST = process.env.PROXY_HOST || 'https://dora.team';
const origin = PROXY_HOST.replace(/http(s)?:\/\/?/, '');

const proxyConfig = {
    target: PROXY_HOST,
    ws: true,
    logLevel: 'debug',
    secure: false,
    onProxyReq(proxyReq, req, res) {
        proxyReq.setHeader('origin', `http://${origin}`);
        proxyReq.setHeader('host', origin);
    },
};

module.exports = {
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './src/index.tsx'],
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    module: {
        rules: [
            // we use babel-loader to load our jsx and tsx files
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders(),
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: jsLoaders('@babel/preset-typescript'),
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: jsLoaders('@babel/preset-react'),
            },
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                use: jsLoaders('@babel/preset-react', '@babel/preset-typescript'),
            },
            {
                test: /\.s?css$/,
                exclude: /.m.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: 'global',
                            localIdentName: '[hash:base64:5]',
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /.m.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]_[hash:base64:5]',
                        },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader'],
            },
        ],
    },
    optimization: optimization(),
    devServer: {
        port: 8082,
        host: "0.0.0.0",
        historyApiFallback: true,
        client: {
            logging: "verbose",
        },
        proxy: {
            '/api': proxyConfig,
        },
    },
    devtool: isProduction ? "hidden-source-map" : "source-map",
    plugins: getPlugins(),
};
