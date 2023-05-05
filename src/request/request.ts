import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError,
} from "axios";
import { useRouter } from "vue-router";

// 定义一些公共的请求参数，避免重复写在每个请求中 PS.用那一个就可以注释另外一个
// 远程测试的后端接口
// const BASE_URL = "http://bs_project.svvs.top/api/v1";
// 本地测试的后端接口
const BASE_URL = "http://www.bstestserver.com/api/v1";
// 请求头
const HEADERS = {
  "Content-Type": "application/json",
};

const router = useRouter();

export default class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: HEADERS,
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
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
    // 接收拦截
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => {
        return response;
      },
      async (error: AxiosError): Promise<never> => {
        // 如果返回状态码为 401，则说明 Token 已经过期，需要重新获取 Token
        if (error.response && error.response.status === 401) {
          // 处理未授权错误
          console.log(error.response);
          
          router.push({
            name: "login",
          });
        }
        return Promise.reject(error.message);
      }
    );
  }

  public static getInstance(): ApiClient {
    // 防止多次实例化
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T | undefined> {
    try {
      const response = await this.axiosInstance.get(url, config);
      return response.data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T | undefined> {
    try {
      const response = await this.axiosInstance.post(url, data, config);
      return response.data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T | undefined> {
    try {
      const response = await this.axiosInstance.put(url, data, config);
      return response.data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  public async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T | undefined> {
    try {
      const response = await this.axiosInstance.patch(url, data, config);
      return response.data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T | undefined> {
    try {
      const response = await this.axiosInstance.delete(url, config);
      return response.data;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
}
