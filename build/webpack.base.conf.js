'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
    //vue-load 处理.vue 结尾的文件
const vueLoaderConfig = require('./vue-loader.conf')
    //resolve这个函数返回的是当前目录下"../dir"这个文件夹，__dirname指的是当前文件所在路径
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}



module.exports = {
    //基础目录，绝对路径，用于从配置中解析入口起点(entry point)和加载器(loader)
    context: path.resolve(__dirname, '../'),
    //入口 webpack 应该使用哪个模块 可以是数组
    entry: {
        app: './src/main.js'
    },
    //webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件
    output: {
        //导出目录,绝对路径
        path: config.build.assetsRoot,
        //输出文件的名称
        filename: '[name].js',
        //打包后浏览器访问服务时的 url 路径,可用于改资源请求路径
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath :
            config.dev.assetsPublicPath
    },
    //主要设置模块如何被解析。
    resolve: {
        //自动解析确定的拓展名,使导入模块时不带拓展名 例如映入./build/Test  不需要.js结尾
        extensions: ['.js', '.vue', '.json'],
        //常用模块别名
        //import vue = import resume/node_modules/vue/dist/vue.esm.js
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
        }
    },
    //模块
    module: {
        //指定模块解析规则
        rules: [{
                //ES6新加入和扩展运算符
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    node: {
        //以下选项是Node.js全局变量或模块，这里主要是防止webpack注入一些Node.js的东西到vue中
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
}