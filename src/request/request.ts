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
// 是否正在刷新的标记
let isRefreshing = false;
const router = useRouter();
export default class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  constructor() {
    // 创建了一个实例
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
      (response: AxiosResponse): any => {
        const { code } = response.data;
        if (code === 401) {
          const config = response.config;
          if (!isRefreshing) {
            isRefreshing = true;
            return this.get("/refresh")
              .then((res: any) => {
                if (res.data == "无法刷新令牌") {
                  window.location.href = "/login";
                  this.clearStorage();
                } else {
                  localStorage.setItem("token", res.data.access_token);
                  // localStorage.setItem("token", res.data.access_token);
                  config.headers.Authorization = `Bearer ${
                    res!.data.access_token
                  }`;
                }
                // 发送原始请求
                return this.axiosInstance(config);
              })
              .catch((err: any) => {
                window.location.href = "/login";
                this.clearStorage();
                console.log(err);
                return Promise.reject(err);
              })
              .finally(() => {
                isRefreshing = false;
              });
          }
        }
        return response;
      },
      async (error: AxiosError): Promise<AxiosResponse> => {
        return Promise.reject(error);
      }
    );
  }

  // 清除缓存;
  public clearStorage() {
    localStorage.removeItem("Rtoken");
    localStorage.removeItem("token");
    localStorage.removeItem("expires_in");
    sessionStorage.removeItem("role");
  }

  // 引入该文件之后调用此方法
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
      console.log(error);
      return undefined;
    }
  }

  // 并发请求方法
  public async all<T>(requests: Array<Promise<T>>): Promise<Array<T>> {
    try {
      const responses = await Promise.all(requests);
      return responses;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  // TODO:别删
  // 并发请求的使用方法
  //  const apiClient = ApiClient.getInstance();
  // const usersRequest = apiClient.get("/users");
  // const productsRequest = apiClient.get("/products");

  // const [users, products] = await apiClient.all([usersRequest, productsRequest]);
  // console.log(users, products);
}
