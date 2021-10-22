import axios from "axios";
import store from "@/store";
import { ElNotification } from 'element-plus'
const baseURL = "/admin";
const instance = axios.create({
  baseURL,
  timeout: 60000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      config.headers.authorization = store.getters.token;
    }
    return config;
  },
  (error) => {
    Notification.error({
      title: "错误",
      message: error,
    });
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.success) {
      return res;
    }
    ElNotification.error({
      title: "错误",
      message: res.data,
    });
    return Promise.reject(res.data);
  },
  (error) => {
    ElNotification.error({
      title: "错误",
      message: JSON.parse(error.response.data.data) || "error",
    });
    return Promise.reject(error);
  }
);

export default instance;
