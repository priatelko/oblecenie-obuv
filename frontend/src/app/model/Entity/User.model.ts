export interface UserModel {
  id: number;
  createdAt: string;
  email: string;
  name: string;
  surname: string;
  loginRole: UserLoginRoleModel;
  token: string;
}

export enum UserLoginRoleModel {
  Buyer = 'ROLE_BUYER',
  Seller = 'ROLE_SELLER'
}
