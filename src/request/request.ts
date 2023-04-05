import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";

export default class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      // 测试的后端接口
      baseURL: "http://www.bstestserver.com/api/v1",
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    // 接收拦截
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => {
        return response;
      },
      (error: any): Promise<never> => {
        return Promise.reject(error);
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }
}
