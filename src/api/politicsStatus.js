import request from '@/utils/request'
/**
 * 根据id获取政治面貌信息
 */
export default {
    getAllPoliticsStatus(id) {
        return request({
            url: `/politicsStatus/getAllPoliticsStatus/${id}`,
            method: `get`
        })
    }
}