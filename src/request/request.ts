import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError,
} from "axios";

import { useRouter } from "vue-router";
import type { apiResponseTokenType } from "../model/interface";

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
      (response: AxiosResponse): AxiosResponse => {
        return response;
      },
      async (error: AxiosError): Promise<AxiosResponse> => {
        // TODO:token的安全性有待提升，目前的问题是用户可以直接在 localStorage里面获取到自己的token很危险
        // TODO:这一步刷新token一直实现不了不知道为什么，待解决，
        // 现在采用登录过期之后直接让用户重新登录( 在store.js文件中实现 ) , 而不是刷新token
        // PS . 现在将token过期时间延长至 7天
        try {
          // 如果返回状态码为 401，则说明 Token 已经过期，需要重新获取 Token
          console.log(error.response);
          console.log(error.response?.status);
          if (error.response && error.response.status === 401) {
            // 处理未授权错误
            console.log(error.response);
            const refreshedResponse = await this.refreshToken(error);
            return Promise.resolve(refreshedResponse); // 返回一个解决的 Promise 对象
          }
          throw error;
        } catch (error) {
          return Promise.reject(error);
        }
      }
    );
  }
  // 刷新token
  public async refreshToken(error: AxiosError) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push({ name: "login" });
        return Promise.reject("未登录或登录信息已过期");
      }
      // 发送刷新 Token 的请求
      const response: apiResponseTokenType = await this.axiosInstance.get(
        "/refresh"
      );
      // 将新的 Token 存储到本地存储中
      localStorage.setItem("token", response!.data.access_token);
      localStorage.setItem("refreshToken", response!.data.access_token);
      // 获取原始请求的配置信息
      const originalRequest: any = error.config;
      // 设置新的 Token 到头部信息中
      originalRequest.headers.Authorization = `Bearer ${
        response!.data.access_token
      }`;
      // 重新发送原始请求
      return this.axiosInstance(originalRequest);
    } catch (error) {
      // 如果刷新 Token 失败，则跳转到登录页
      router.push({
        name: "login",
      });
      return Promise.reject(error);
    }
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
      console.error(error);
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
