import request from '@/utils/request'
/**
 * 上传
 * @param {*} params 
 * @returns 
 */
export function upload(data) {
    return request({
        url: 'data/upload/',
        method: 'post',
        data
    })
}
/**
 * 导出
 * @returns 
 */
export function exportData() {
    return request({
        url: 'data/export/',
        method: 'get',
    })
}

/**
 * 获取政治面貌信息
 * @param {*} params 
 * @returns 
 */
export function getAllPoliticsStatus() {
    return request({
        url: 'data/politicsStatus/',
        method: 'get'

    })
}
/**
 * 获取民族信息
 * @returns 
 */
export function getAllNations() {
    return request({
        url: 'data/nations/',
        method: 'get'
    })
}
/**
 * 获取职位信息
 * @returns 
 */
export function getAllPositions() {
    return request({
        url: 'data/position/',
        method: 'get'
    })
}
/**
 * 获取职称信息
 * @returns 
 */
export function getAllJobLevels() {
    return request({
        url: 'data/jobLevel/',
        method: 'get'
    })
}
/**
 * 获取部门信息
 * @returns 
 */
export function getAllDepartments() {
    return request({
        url: 'data/department/',
        method: 'get'
    })
}