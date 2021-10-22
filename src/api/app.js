import request from "@/utils/request";
const URL = {
  captcha: "/captcha",
  login: "/login",
  register: "/register",
  userInfo: "/userinfo",
};
export function getCaptcha() {
  return request({
    url: URL.captcha,
    method: "get",
  });
}

// 登陆

export function app_login(data) {
  return request({
    url: URL.login,
    method: "post",
    data,
  });
}

// 注册

export function app_register(data) {
  return request({
    url: URL.register,
    method: "post",
    data,
  });
}

// 用户信息
export function app_userInfo(id) {
  return request({
    url: `${URL.userInfo}/${id}`,
    method: "get",
  });
}

