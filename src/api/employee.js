import request from '@/utils/request'
/**
 * 获取所有员工信息
 * @param {*} params 
 * @returns 
 */
export default {
    getAllEmps() {
        return request({
            url: `/Emp/getEmp`,
            method: `get`,
            data: {

            }
        })
    }
}