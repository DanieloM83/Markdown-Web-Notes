export interface RegisterResponseData {
  id: string;
}

export interface LoginResponseData {
  id: string;
}

export interface LogoutResponseData {
  success: boolean;
}

export interface UserData {
  username: string;
  id: string;
}

export interface GetCurrentUserData extends UserData {}
