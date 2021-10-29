import request from "@/utils/request";
const url = '/menu'
export function menu_list() {
    return request({
        url,
        method: 'GET',
    })
}
export function menu_create(data) {
    return request({
        url,
        method: 'post',
        data
    })
}
export function menu_delete(id) {
    return request({
        url: `${url}/${id}`,
        method: "delete",
    })
}
export function menu_update(id, data) {
    return request({
        url: `${url}/${id}`,
        method: "put",
        data
    })
}