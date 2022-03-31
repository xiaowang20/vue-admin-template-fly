'use strict'
//用来在命令行输出不同颜色文字的包，可以使用chalk.yellow("想添加颜色的文字....")
const chalk = require('chalk')
    //版本解析插件
const semver = require('semver')
const packageConfig = require('../package.json')
    //一个用来执行unix命令的包
const shell = require('shelljs')
    // child_process 开启子进程，并执行 cmd 命令 然后返回结果
function exec(cmd) {
    return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [{
        name: 'node',
        //格式化版本号
        currentVersion: semver.clean(process.version),
        versionRequirement: packageConfig.engines.node
    }]
    // shell.which('命令')在系统环境变量搜索命令, 如果用的是 npm 就检查 npm 版本
if (shell.which('npm')) {
    versionRequirements.push({
        name: 'npm',
        currentVersion: exec('npm --version'),
        versionRequirement: packageConfig.engines.npm
    })
}

module.exports = function() {
    const warnings = []

    for (let i = 0; i < versionRequirements.length; i++) {
        const mod = versionRequirements[i]
            //如果版本不符合package.json文件中指定的版本号，返回false,进入if
        if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
            warnings.push(mod.name + ': ' +
                chalk.red(mod.currentVersion) + ' should be ' +
                chalk.green(mod.versionRequirement)
                //把当前版本号用红色字体 符合要求的版本号用绿色字体 给用户提示具体合适的版本
            )
        }
    }

    if (warnings.length) {
        console.log('')
        console.log(chalk.yellow('To use this template, you must update following to modules:'))
        console.log()

        for (let i = 0; i < warnings.length; i++) {
            const warning = warnings[i]
            console.log('  ' + warning)
        }

        console.log()
        process.exit(1)
            //提示用户更新版本
    }
}