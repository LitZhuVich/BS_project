export interface user {
  id: number;
  username: string;
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
}
