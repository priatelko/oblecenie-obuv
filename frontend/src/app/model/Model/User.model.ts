import { FacebookLoginProvider } from 'angularx-social-login';
import { ImageEntity } from '../Entity/ArticleForm.entity';

export interface UserModel {
  loginRole: UserBussinesRoleModel;
  id?: number;
  createdAt?: string;
  email?: string;
  name?: string;
  surname?: string;
  roles?: UserRoleModel[];
  token?: string;
  provider?: SocialProvider;
  avatar?: string;
  extra?: boolean; // ma platene
}

export enum UserBussinesRoleModel {
  Anonym = 'ANONYMOUS',
  Buyer = 'ROLE_BUYER',
  Seller = 'ROLE_SELLER',
}

export enum UserRoleModel {
  User = 'ROLE_USER',
  Admin = 'ROLE_ADMIN',
}

export enum SocialProvider {
  Local = 'local',
  Facebook = 'facebook',
  Google = 'google',
}
