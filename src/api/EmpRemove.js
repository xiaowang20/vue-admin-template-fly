import request from '@/utils/request'
/**
 * 分页获取list
 * @returns 
 */
export function getList(params) {
    return request({
        url: `EmpRemove/list1`,
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
export function updateEmpRemove(id, data) {
    return request({
        url: `EmpRemove/update/${id}`,
        method: 'put',
        data: data
    })
}