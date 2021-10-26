import request from "@/utils/request";
const url = '/user'
// 用户列表
export function user_list(data) {
    return request({
        url,
        method: "get",
        params: data
    })
}
// 添加用户
export function user_create(data) {
    return request({
        url,
        method: "post",
        params: data
    })
}
//删除用户 
export function user_delete(id) {
    return request({
        url: `${url}/${id}`,
        method: "delete",
    })
}
// 展示用户详情
export function user_show(id) {
    return request({
        url: `${url}/${id}`,
        method: "get",
    })
}
// 修改用户内容
export function user_update(id, data) {
    return request({
        url: `${url}/${id}`,
        method: "put",
        data
    })
}