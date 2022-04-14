import request from '@/utils/request'
/**
 * 获取全部admin信息
 */
export function getList(params) {
    return request({
        url: `/admin/list`,
        method: 'get',
        params: params
    })
}
/**
 * 修改用户状态
 * @param {*} params 
 * @returns 
 */
export function updateStatus(id, params) {
    return request({
        url: '/admin/updateStatus/' + id,
        method: 'post',
        params: params
    })
}
/**
 * 修改用户
 * @param {*} id 
 * @param {*} data 
 * @returns 
 */
export function updateAdmin(id, data) {
    return request({
        url: '/admin/updateAdmin/' + id,
        method: 'post',
        data: data
    })
}
/**
 * 根据id删除指定用户
 */
export function deleteAdmin(id) {
    return request({
        url: `/admin/deleteAdmin/${id}`,
        method: 'delete'
    })
}
/**
 * 根据id获取roleList
 */
export function getRoleListByAdminId(id) {
    return request({
        url: `/admin/getRoleList/${id}`,
        method: 'get'
    })
}
/**
 * 分配角色
 */
export function allocRole(data) {
    return request({
        url: `/admin/role/update/`,
        method: 'post',
        data: data
    })
}