'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
    //使用webpack-merge来进行合并，减少重复代码。
module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    BASE_API: '"http://localhost:8081"'
})