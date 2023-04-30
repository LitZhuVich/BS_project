import { user } from "./users";
import { order } from "./orders";
// 保存接口定义的类型

export interface apiResponse<T> {
  code: number;
  status: string;
  data: T;
  message: string;
}

// 使用泛型创建具体的接口类型
export type apiResponseUser = apiResponse<user>;
export type apiResponseOrder = apiResponse<order>;
