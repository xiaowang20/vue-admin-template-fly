'use strict'
/*工具类 主要提供以下几个方法
 * assetsPath 获取静态资源路径
 * exports.cssLoaders 返回针对各类型的样式文件的处理方式
 * exports.styleLoaders  返回webpack需要的css相关的loader的配置，它也使用了cssLoaders()
 * exports.createNotifierCallback node-notifier'是一个跨平台系统通知的页面。
 * 当遇到错误时，它能用系统原生的推送方式给你推送信息这个方法用于推送错误信息
 * 跳转至utils
 */
const utils = require('./utils')
    //引入webpack模块
const webpack = require('webpack')
    /*引入配置文件 他下面有3个文件
     * dev.env.js 导出开发环境的名称
     * prod.env.js 到处生产环境的名称
     * index.js 到处不同环境需要的具体配置
     * 跳转至config
     */
const config = require('../config')
    //webpack-merge这个包，这个包的作用是来合并两个配置文件对象并生成一个新的配置文件，
    //有点儿类似于es6的Object.assign()方法。合并冲突时，第二个参数的属性值会覆盖第一个参数的属性值。
const merge = require('webpack-merge')
    //处理文件路径的模块
const path = require('path')
    /* 配置webpack编译入口
     * 配置webpack输出路径和命名规则
     * 配置模块resolve规则
     * 配置不同类型模块的处理规则
     * 跳转至webpack.base.conf
     */
const baseWebpackConfig = require('./webpack.base.conf')
    //一个负责拷贝资源的插件
const CopyWebpackPlugin = require('copy-webpack-plugin')
    // 一个用于生成HTML文件并自动注入依赖文件（link/script）的webpack插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
    //一个更友好的展示webpack错误提示的插件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
    //一个自动检索端口的包
const portfinder = require('portfinder')
    //当前环境HOST
const HOST = process.env.HOST
    //当前环境端口
const PORT = process.env.PORT && Number(process.env.PORT)
    //baseWebpackConfig请跳到./webpack.base.conf小节
const devWebpackConfig = merge(baseWebpackConfig, {
        module: {
            //此处的配置会覆盖掉baseWebpackConfig的 sourceMap是否开启，是否使用postcss
            //postcssloader 为CSS3自动加上浏览器前缀
            rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
        },
        // cheap-module-eval-source-map在开发环境中最快
        devtool: config.dev.devtool,

        // these devServer options should be customized in /config/index.js
        devServer: {
            clientLogLevel: 'warning',
            historyApiFallback: {
                rewrites: [
                    { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
                ],
            },
            hot: true,
            contentBase: false, // since we use CopyWebpackPlugin.
            compress: true,
            host: HOST || config.dev.host,
            port: PORT || config.dev.port,
            open: config.dev.autoOpenBrowser,
            overlay: config.dev.errorOverlay ?
                { warnings: false, errors: true } :
                false,
            publicPath: config.dev.assetsPublicPath,
            proxy: config.dev.proxyTable,
            quiet: true, // necessary for FriendlyErrorsPlugin
            watchOptions: {
                poll: config.dev.poll,
            }
        },
        //插件
        plugins: [
            //配置开发环境
            new webpack.DefinePlugin({
                'process.env': require('../config/dev.env')
            }),
            //模块热替换的插件，修改模块不需要刷新页面
            new webpack.HotModuleReplacementPlugin(),
            //当使用HotModuleReplacementPlugin时，这个插件会显示模块正确的相对路径
            new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
            //在编译出错时，使用NoEmitOnErrorsPlugin来跳过输出阶段，这样可以确保输出资源不会包含错误
            new webpack.NoEmitOnErrorsPlugin(),
            //这里将resume/index.html作为模版，生成一份新的index.html在build下。
            // https://github.com/ampedandwired/html-webpack-plugin
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'index.html',
                inject: true
            }),
            // 复制静态资源
            // copy custom static assets
            new CopyWebpackPlugin([{
                from: path.resolve(__dirname, '../static'),
                to: config.dev.assetsSubDirectory,
                ignore: ['.*']
            }])
        ]
    })
    //这里主要是做端口的检索以及npm run dev后对错误的处理
module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port
                // add port to devServer config
            devWebpackConfig.devServer.port = port

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
                compilationSuccessInfo: {
                    messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
                },
                onErrors: config.dev.notifyOnErrors ?
                    utils.createNotifierCallback() :
                    undefined
            }))

            resolve(devWebpackConfig)
        }
    })
})