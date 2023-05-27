import { instance } from "common/api/common.api";

export const authApi = {
  register: (payload: ArgRegister) => {
    return instance.post<RegisterResponse>("auth/register", payload);
  },
  login: (payload: ArgLogin) => {
    return instance.post<ProfileType>("auth/login", payload);
  },
  me: () => {
    return instance.post<ProfileType>("auth/me", {});
  },
  logout: () => {
    return instance.delete<LogoutType>("auth/me");
  },
};

export type ArgRegister = {
  email: string;
  password: string;
};

export type ArgLogin = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export interface RegisterResponse {
  addedUser: Omit<ProfileType, "token" | "tokenDeathTime">;
}

export interface ProfileType {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  __v: number;
  token: string;
  tokenDeathTime: number;
}

export interface LogoutType {
  info: string;
}
