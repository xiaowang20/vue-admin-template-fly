import request from '@/utils/request'
/**
 * 分页获取list
 * @returns 
 */
export function getList(params) {
    return request({
        url: `Ec/list`,
        method: 'get',
        params: params
    })
}