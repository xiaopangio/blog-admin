import request from "@/utils/request"
const URL = {
    province: '/province',
    city: '/city',
    area: '/area',
};
export function public_province() {
    return request({
        url: URL.province,
        method: 'get',
    })
}
export function public_city(id) {
    return request({
        url: `${URL.city}/${id}`,
        method: 'get',
    })
}
export function public_area(id) {
    return request({
        url: `${URL.area}/${id}`,
        method: 'get',
    })
}