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
  update: (payload: ArgUpdate) => {
    return instance.put<UpdateType>("auth/me", payload);
  },
  forgot: (payload: ArgForgot) => {
    // {"info":"sent —ฅ/ᐠ.̫ .ᐟ\\ฅ—","success":true,"answer":false,"html":false}
    return instance.post<any>("auth/forgot", payload); // TODO any
  },
};

export type ArgRegister = {
  email: string;
  password: string;
};

export type ArgUpdate = {
  name?: string;
  avatar?: string; // url or base64
};

export type ArgLogin = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type ArgForgot = {
  email: string;
  from?: string;
  message: string;
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
  avatar?: string;
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

export interface UpdateType {
  updatedUser: ProfileType;
  token: string;
  tokenDeathTime: number;
}
