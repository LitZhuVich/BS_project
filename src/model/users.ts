export interface user {
  id: number;
  username: string;
  companyname: string;
  avator: string | null;
  phone: string | null;
  address: string | null;
  email: string | null;
  is_verified: number;
  email_verification_token: string | null;
  role_id: number;
  role_name: string;
  created_at: string;
  updated_at: string;
  remark: string;
}

// 返回客户数据类型
export interface CustomerRepresentative extends user {
  groups_count: number;
  groups: [
    {
      id: number;
      group_name: string;
    }
  ];
  classification: string;
}
