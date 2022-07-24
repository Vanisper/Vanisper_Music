import axios from "axios";
import { baseUrl } from "./url";

// 请求拦截器
axios.interceptors.request.use((config) => {
  console.log(config);
  return config;
});

// 响应拦截器
axios.interceptors.response.use((response) => response.data);
