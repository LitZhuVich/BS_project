import { asset_categories } from "./asset_categories";
import { asset } from "./assets";
import { equipment } from "./equipments";
import { group_user } from "./group_users";
import { group } from "./groups";
import { order_code } from "./order_codes";
import { order_log } from "./order_logs";
import { order_priorities } from "./order_priorities";
import { order_replies } from "./order_replies";
import { order_status } from "./order_status";
import { order_type } from "./order_type";
import { role } from "./roles";
import { user } from "./users";
import { order } from "./orders";

// 保存接口定义的类型
export interface apiResponse<T> {
  code: number;
  status: string;
  data: T;
  message: string;
}

// 令牌类型
interface tokenType {
  access_token: string;
  token_type: string;
  expires_in: number;
}

// 使用泛型创建具体的接口类型
export type apiResponseData = apiResponse<string> | undefined;
export type apiResponseUser = apiResponse<user> | undefined;
export type apiResponseOrder = apiResponse<order> | undefined;
export type apiResponseRole = apiResponse<role> | undefined;
export type apiResponseOrderType = apiResponse<order_type> | undefined;
export type apiResponseOrderStatus = apiResponse<order_status> | undefined;
export type apiResponseOrderReplies = apiResponse<order_replies> | undefined;
export type apiResponseOrderPriorities =
  | apiResponse<order_priorities>
  | undefined;
export type apiResponseOrderLog = apiResponse<order_log> | undefined;
export type apiResponseOrderCode = apiResponse<order_code> | undefined;
export type apiResponseOrderGroup = apiResponse<group> | undefined;
export type apiResponseOrderGroupUser = apiResponse<group_user> | undefined;
export type apiResponseEquipment = apiResponse<equipment> | undefined;
export type apiResponseAsset = apiResponse<asset> | undefined;
export type apiResponseAssetCategories =
  | apiResponse<asset_categories>
  | undefined;
export type apiResponseToken = apiResponse<tokenType> | undefined;
