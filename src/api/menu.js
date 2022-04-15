import request from '@/utils/request'
/**
 * 分页获取全部menu信息
 */
export function getMenuList(parentId, params) {
    return request({
        url: `/menu/list/${parentId}`,
        method: 'get',
        params: params
    })
}
/**
 * 修改菜单状态
 * @param {*} id 
 * @param {*} params 
 * @returns 
 */
export function updateEnable(id, params) {
    return request({
        url: `/menu/updateStatus/${id}`,
        method: 'post',
        params: params
    })
}
/**
 * 修改菜单keepAlive
 * @param {*} id 
 * @param {*} params 
 * @returns 
 */
export function updateKeepAlive(id, params) {
    return request({
        url: `/menu/updateKeepAlive/${id}`,
        method: 'post',
        params: params
    })
}
/**
 * 修改菜单requireAuth
 * @param {*} id 
 * @param {*} params 
 * @returns 
 */
export function updateRequireAuth(id, params) {
    return request({
        url: `/menu/updateRequireAuth/${id}`,
        method: 'post',
        params: params
    })
}
/**
 * 添加菜单
 * @param {*} data 
 * @returns 
 */
export function createMenu(data) {
    return request({
        url: '/menu/addMenu',
        method: 'post',
        data: data
    })
}
/**
 * 根据id修改菜单
 * @param {*} data 
 * @returns 
 */
export function updateMenu(id, data) {
    return request({
        url: '/menu/updateMenu/' + id,
        method: 'post',
        data: data
    })
}
/**
 * 根据id获取菜单
 * @param {*} id 
 * @returns 
 */
export function getMenuById(id) {
    return request({
        url: '/menu/getMenuById/' + id,
        method: 'get',
    })
}
/**
 * 通过id删除菜单
 * @param {*} id 
 * @returns 
 */
export function deleteById(id) {
    return request({
        url: '/menu/delete/' + id,
        method: 'delete',
    })
}
/**
 * 树形结构查询所有菜单
 * @returns 
 */
export function fetchTreeList() {
    return request({
        url: '/menu/tree2/list',
        method: 'get'
    })
}