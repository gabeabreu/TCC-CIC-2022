export enum UserTypes {
  RESET_STATE = '@User/RESET_STATE',
  SET_USER_DATA = "@User/SET_USER_DATA"
}

export interface ResetState {
  type: UserTypes.RESET_STATE;
}

export interface SetUserData {
  type: UserTypes.SET_USER_DATA;
  payload: { data: User }
}

export type UserActionTypes = ResetState | SetUserData;

export interface User {
  address: string,
  name: string,
  bio: string,
  discord: string,
  website: string,
  twitter: string,
  instagram: string,
  isVerified: false,
  profilePictureUrl: string,
  bannerPictureUrl: string,
}

export interface UserState {
  loading: boolean;
  data: User;
}
