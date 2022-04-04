import request from '@/utils/request'
/**
 * 获取所有员工信息
 * @param {*} params 
 * @returns 
 */

export function getAllEmps(params) {
    return request({
        url: 'Emp/getAllEmp/',
        method: 'get',
        params: params
    })
}