import request from '@/utils/request'
/**
 * 分页获取全部role信息
 */
export function getRoleList(params) {
    return request({
        url: `/role/list`,
        method: 'get',
        params: params
    })
}
/**
 * 获取全部角色信息
 */
export function getAllRoleList() {
    return request({
        url: `/role/listAll`,
        method: 'get'

    })
}
/**
 * 添加角色
 */
export function createRole(data) {
    return request({
        url: `/role/add`,
        method: 'post',
        data: data
    })
}
/**
 * 更新角色信息
 */
export function updateRole(id, data) {
    return request({
        url: `/role/updateRole/${id}`,
        method: 'post',
        data: data

    })
}
/**
 * 批量删除角色
 */
export function deleteRole(data) {
    return request({
        url: `/role/deleteRole/`,
        method: 'delete',
        data: data

    })
}
/**
 * 给角色分配菜单
 * @param {*} roleId 
 * @param {*} data 
 * @returns 
 */
export function allocMenu(data) {
    return request({
        url: `/role/allocMenu/`,
        method: 'post',
        data: data

    })
}
/**
 * 通过roleId获取菜单信息
 * @param {*} roleId 
 * @returns 
 */
export function listMenuByRole(roleId) {
    return request({
        url: `/role/getMenuByRoleId/${roleId}`,
        method: 'get'

    })
}