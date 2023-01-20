import axios from "axios";

const api = axios.create({
  baseURL: "", // 请求的公共地址部分
  timeout: 3000, // 请求超时时间 当请求时间超过5秒还未取得结果时 提示用户请求超时
  withCredentials: true, //是否运行请求携带Cookie
});

// 请求拦截处理
api.interceptors.request.use(
  (config) => {
    // 响应成功的返回
    return config; // 将配置完成的config对象返回出去 如果不返回 请求讲不会进行
  },
  (err) => {
    // 请求发生错误时的相关处理 抛出错误
    //响应失败的返回
    Promise.reject(err);
  }
);
//响应拦截处理
api.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    // 服务器响应发生错误时的处理
    Promise.reject(err);
  }
);

export default api;
