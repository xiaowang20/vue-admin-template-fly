'use strict'
const path = require('path')
    //跳转至config
const config = require('../config')
    //这个plugin的作用是将打包后生成的css文件通过link的方式引入到html中，如果不适用这个插件css代码会放到head标签的style中
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
    /**
     * process.env.NODE_ENV是一个环境变量，它是由webpack.dev/prod.conf.js这两个文件声明的;
     * 这里的意思是判断当前是否是开发环境，如果是就把config下index.js文件中build.assetsSubDirectory或
     * dev.assetsSubDirectory的值赋给assetsSubDirectory
     * @param {*} _path 
     * @returns 
     */
exports.assetsPath = function(_path) {
        const assetsSubDirectory = process.env.NODE_ENV === 'production' ?
            config.build.assetsSubDirectory :
            config.dev.assetsSubDirectory

        return path.posix.join(assetsSubDirectory, _path)
    }
    //cssLoaders的作用是导出一个供vue-loader的options使用的一个配置;
exports.cssLoaders = function(options) {
        options = options || {}

        const cssLoader = {
            loader: 'css-loader',
            options: {
                sourceMap: options.sourceMap
            }
        }

        const postcssLoader = {
            loader: 'postcss-loader',
            options: {
                sourceMap: options.sourceMap
            }
        }

        // generate loader string to be used with extract text plugin
        function generateLoaders(loader, loaderOptions) {
            const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

            if (loader) {
                loaders.push({
                    loader: loader + '-loader',
                    options: Object.assign({}, loaderOptions, {
                        sourceMap: options.sourceMap
                    })
                })
            }

            // Extract CSS when that option is specified
            // (which is the case during production build)
            if (options.extract) {
                return ExtractTextPlugin.extract({
                    use: loaders,
                    fallback: 'vue-style-loader'
                })
            } else {
                return ['vue-style-loader'].concat(loaders)
            }
        }

        // https://vue-loader.vuejs.org/en/configurations/extract-css.html
        return {
            css: generateLoaders(),
            postcss: generateLoaders(),
            less: generateLoaders('less'),
            sass: generateLoaders('sass', { indentedSyntax: true }),
            scss: generateLoaders('sass'),
            stylus: generateLoaders('stylus'),
            styl: generateLoaders('stylus')
        }
    }
    //用来给webpack提供和css相关的loader的配置，它使用了cssLoaders方法;
    // Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
        const output = []
        const loaders = exports.cssLoaders(options)

        for (const extension in loaders) {
            const loader = loaders[extension]
            output.push({
                test: new RegExp('\\.' + extension + '$'),
                use: loader
            })
        }

        return output
    }
    //当遇到错误时，给你推送信息
exports.createNotifierCallback = () => {
    const notifier = require('node-notifier')

    return (severity, errors) => {
        if (severity !== 'error') return

        const error = errors[0]
        const filename = error.file && error.file.split('!').pop()

        notifier.notify({
            title: packageConfig.name,
            message: severity + ': ' + error.name,
            subtitle: filename || '',
            icon: path.join(__dirname, 'logo.png')
        })
    }
}