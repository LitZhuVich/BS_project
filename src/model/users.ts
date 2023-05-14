export interface user {
  id: number;
  username: string;
  companyname: string;
  avator: string | null;
  phone: string | null;
  address: string | null;
  email: string | null;
  email_verification_token: string | null;
  role_id: number;
  is_locked: string;
  role_name: string;
  created_at: string;
  updated_at: string;
  remark: string;
}

// 返回客户数据类型
export interface CustomerRepresentative {
  current_page: number;
  data: Array<CustomerRepresentativeInfo>;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<Link>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}
// 表示单个代表的信息。
export interface CustomerRepresentativeInfo extends user {
  groups_count: number;
  groups: Array<{
    id: number;
    group_name: string;
  }>;
}
// 该类型用于表示当有多页结果时，链接到其他页面的信息
interface Link {
  url: string | null;
  label: string;
  active: boolean;
}
