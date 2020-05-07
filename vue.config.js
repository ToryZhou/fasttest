const { resolve, join } = require('path')
const webpack = require('webpack')
const chalk = require('chalk')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const terminalLink = require('terminal-link')

// const analyzerMode = process.env.NODE_ENV === 'production' ? 'server' : 'disabled'
const IP = JSON.stringify(require('ip').address())
const publicPath = process.env.VUE_APP_BO_domain.indexOf('http') === 0 ? '/' : './'
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const assetRoot = __dirname

const allowedHosts = [
    'localhost',
    'backoffice.zhihuiya.local',
]

// const link = terminalLink('passport', 'http://ci-passport.zhihuiya.com')

module.exports = {
    runtimeCompiler: true,
    publicPath,
    css: {
        // extract: {
        //     filename: '[name].css',
        //     chunkFilename: '[name].css',
        // },
        sourceMap: process.env.NODE_ENV !== 'production',
    },
    devServer: {
        port: 9459,
        // disableHostCheck: true,
        public: 'backoffice.zhihuiya.local',
        // hotOnly: true,
        // watchOptions: {
        //   poll: true
        // },
        // allowedHosts,
        after(app, server, compiler) {
            if (process.env.NODE_ENV !== 'production') {
                compiler.hooks.done.tap('vue-cli-service serve', () => {
                    const { port } = server.listeningApp.address()
                    console.log()
                    allowedHosts.forEach(url => {
                        console.log(chalk.cyan('http://' + url + ':' + port))
                    })
                })
            }
        }
    },
    pluginOptions: {
        webpackBundleAnalyzer: {
            analyzerMode: process.env.NODE_ENV === 'production',
            analyzerPort: 9999,
            openAnalyzer: process.env.NODE_ENV === 'production'
        }
    },
    chainWebpack: config => {
        // config.optimization.splitChunks({
        //     cacheGroups: {
        //         styles: {
        //             test:/\.css$/,
        //             chunks: 'all',
        //             enforce: true
        //         }
        //     }
        // })
    },
    configureWebpack: {
        // devtool: process.env.NODE_ENV !== 'production' ? 'source-map': false,
        optimization: {
            splitChunks: {
                minSize: 10000,
                maxSize: 250000,
                chunks: 'all',
                minChunks: 1,
                // maxAsyncRequests: 5,
                // maxInitialRequests: 6,
                // automaticNameDelimiter: '_',
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        chunks: 'all',
                    },
                    default: false,
                    styles: {
                        name: 'styles',
                        test: /\.s?css$/,
                        chunks: 'all',
                        enforce: true,
                    },
                    // default: {
                    //     minChunks: 2,
                    //     priority: -20,
                    //     reuseExistingChunk: true
                    // },
                }
            }
        },
        resolve: {
            alias: {
                'dat.gui': join(__dirname, 'src/vender/dat.gui.module.js'),
            }
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    IP: IP,
                    BOServer: JSON.stringify(process.env.VUE_APP_BO_domain),
                    tokenServer: JSON.stringify(process.env.VUE_APP_passport_domain),
                    client_id: JSON.stringify(process.env.VUE_APP_client_id),
                }
            }),
            new webpack.optimize.MinChunkSizePlugin({
                minChunkSize: 10000 // Minimum number of characters
            }),
            // new MiniCssExtractPlugin({
            //     filename: '[name].css',
            //     chunkFilename: '[name].css',
            // }),
            // new BundleAnalyzerPlugin(),
        ],
        // module: {
        //     rules: [
        //         {
        //             test: /\.css$/,
        //             use: [MiniCssExtractPlugin.loader],
        //         },
        //     ]
        // },
    },
}
