import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";
import { useRouter } from "vue-router";
const router = useRouter();

export default class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      // 测试的后端接口
      baseURL: "http://www.bstestserver.com/api/v1",
    });
    // 发送拦截
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // 接收拦截
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => {
        return response;
      },
      async (error: any): Promise<never> => {
        // 如果返回状态码为 401，则说明 Token 已经过期，需要重新获取 Token
        if (error.response && error.response.status === 401) {
          // 处理未授权错误
          console.log(error.response);
          // start 刷新token
          try {
            // 发送刷新 Token 的请求
            const response = await this.axiosInstance.get("/refresh");
            // 将新的 Token 存储到本地存储中
            localStorage.setItem("token", response.data.token);
            // 获取原始请求的配置信息
            const originalRequest = error.config;
            // 设置新的 Token 到头部信息中
            originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
            // 重新发送原始请求
            return this.axiosInstance(originalRequest);
          } catch {
            // 如果刷新 Token 失败，则跳转到登录页
            router.push({
              name: "login",
            });
          }
          // end
        }
        return Promise.reject(error.message);
      }
    );
  }

  // get 方法
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }
  // post 方法
  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }
}
