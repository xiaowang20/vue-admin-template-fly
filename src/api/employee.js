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
export function getAllEmpsByQuery(params) {
    return request({
        url: 'Emp/listPageQuery/',
        method: 'post',
        params: params
    })
}
/**
 * 删除
 */

export function deleteById(id) {
    return request({
        url: `Emp/delete/${id}`,
        method: 'delete'

    })
}