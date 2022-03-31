'use strict'
require('./check-versions')()
    //指定为生成环境
process.env.NODE_ENV = 'production'
    // node 终端的 loading 图
const ora = require('ora')
    // 用于深度删除模块
const rm = require('rimraf')

const path = require('path')
    // 命令行彩色输出
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
    //loading图显示
const spinner = ora('building for production...')
spinner.start()
    /*
     *使用 rimraf 将旧的编译输出的文件夹删除，然后重新编译生成
     *rimraf(f: 路径, [opts], callback: 回调)
     */
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err
    webpack(webpackConfig, (err, stats) => {
        spinner.stop()
        if (err) throw err
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        if (stats.hasErrors()) {
            console.log(chalk.red('  Build failed with errors.\n'))
            process.exit(1)
        }

        console.log(chalk.cyan('  Build complete.\n'))
        console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'
        ))
    })
})