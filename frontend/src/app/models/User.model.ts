export interface UserModel {
  id: number;
  createdAt: string;
  email: string;
  name: string;
  surname: string;
  loginRole: string;
  token: string;
  error?: number;
}
