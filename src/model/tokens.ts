export interface token {
  id: number;
  user_id: number;
  asset_id: number;
  work_order_code: string;
  asset_code: string;
}

// 令牌类型
export interface tokenType {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface message {
  message: string;
  errors: {};
}
