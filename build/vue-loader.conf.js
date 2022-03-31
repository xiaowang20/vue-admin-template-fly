'use strict'
const utils = require('./utils')
const config = require('../config')
    //开发环境生产环境标识
const isProduction = process.env.NODE_ENV === 'production'
    //不同环境为sourceMapEnabled 赋值: 这里都为true
const sourceMapEnabled = isProduction ?
    config.build.productionSourceMap :
    config.dev.cssSourceMap
    //导出vue-loader的配置，这里我们用了utils文件中的cssLoaders();
module.exports = {
    //vue-loader 处理.vue文件 将vue文件转换为JS模块 其中定义了其他loader，
    //对< style >< template >中的静态资源当做模块来对待，并且使用webpack loaders进行处理
    loaders: utils.cssLoaders({
        sourceMap: sourceMapEnabled,
        extract: isProduction
    }),
    //是否开启cssSourceMap,Source map就是一个信息文件,主要用于开发环境的调试，
    //里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。
    cssSourceMap: sourceMapEnabled,
    //一个配合devtool的配置，当给文件名插入新的hash导致清楚缓存时是否生成souce maps，默认在开发环境下为true
    cacheBusting: config.dev.cacheBusting,
    //transformToRequire的作用是在模板编译的过程中，编译器可以将某些属性，如src转换为require调用;
    //配置这个之后就不需要在使用src时使用require
    transformToRequire: {
        video: ['src', 'poster'],
        source: 'src',
        img: 'src',
        image: 'xlink:href'
    }
}