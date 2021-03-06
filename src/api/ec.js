import request from '@/utils/request'
/**
 * 分页获取list
 * @returns 
 */
export function getList(params) {
    return request({
        url: `Ec/list2`,
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
export function updateEc(id, data) {
    return request({
        url: `Ec/update/${id}`,
        method: 'put',
        data: data
    })
}