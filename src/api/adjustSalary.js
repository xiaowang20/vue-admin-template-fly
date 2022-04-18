import request from '@/utils/request'
/**
 * 分页获取list
 * @returns 
 */
export function getList(params) {
    return request({
        url: `EmpAdjustSalary/list1`,
        method: 'get',
        params: params
    })
}
/**
 * 编辑
 * @param {*} id 
 * @param {*} data 
 * @returns 
 */
export function updateEmpAdjustSalary(id, data) {
    return request({
        url: `EmpAdjustSalary/update/${id}`,
        method: 'put',
        data: data
    })
}