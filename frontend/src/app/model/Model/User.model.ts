export interface UserModel {
  id: number;
  createdAt: string;
  email: string;
  name: string;
  surname: string;
  loginRole: UserLoginRoleModel;
  roles: string[];
  token: string;
}

export enum UserLoginRoleModel {
  Buyer = 'ROLE_BUYER',
  Seller = 'ROLE_SELLER'
}

export enum UserRoleModel {
  User = 'ROLE_USER',
  Admin = 'ROLE_ADMIN'
}
