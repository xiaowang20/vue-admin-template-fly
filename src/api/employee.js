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
/**
 * 
 * 添加员工
 */
export function addEmp(data) {
    return request({
        url: `Emp/add`,
        method: 'post',
        data: data
    })
}
/**
 * 通过编号获取员工信息
 */
export function getAllById(id) {
    return request({
        url: `Emp/getAllById/${id}`,
        method: 'get'
    })
}
/**
 * 
 * 通过编号修改员工
 */
export function updateEmp(id, data) {
    return request({
        url: `Emp/update/${id}`,
        method: 'put',
        data: data
    })
}