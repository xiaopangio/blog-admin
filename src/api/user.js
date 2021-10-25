import request from "@/utils/request";
const url = '/user'
export function user_list(data) {
    return request({
        url,
        method: "get",
        params: data
    })
}