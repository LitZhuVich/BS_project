import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";

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
      (error: any): Promise<never> => {
        if (error.response && error.response.status === 401) {
          // 处理未授权错误
          console.log(error.response);
          // console.error(error.message); // 输出其他错误信息
        } else {
          // console.error(error.message); // 输出其他错误信息
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
