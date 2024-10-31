import { RegisterResponseData, LoginResponseData, LogoutResponseData, GetCurrentUserData } from "./models.ts";
import { UserCredentialsType } from "./schemas.ts";
import { getQuery, postQuery } from "../config.ts";

export const login = async (credentials: UserCredentialsType) => {
  const response = await postQuery<LoginResponseData, UserCredentialsType>("/auth/login", credentials);
  console.log(response);
  return response;
};

export const register = async (credentials: UserCredentialsType) => {
  const response = await postQuery<RegisterResponseData, UserCredentialsType>("/auth/register", credentials);
  console.log(response);
  return response;
};

export const logout = async () => {
  const response = await postQuery<LogoutResponseData, {}>("/auth/register", {});
  console.log(response);
  return response;
};

export const getCurrentUser = async () => {
  const response = await getQuery<GetCurrentUserData>("/auth/current_user");
  console.log(response);
  return response;
};