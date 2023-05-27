import { instance } from "common/api/common.api";

export const authApi = {
  register: (payload: ArgRegister) => {
    return instance.post<RegisterResponse>("auth/register", payload);
  },
  login: (payload: ArgLogin) => {
    return instance.post<ProfileType>("auth/login", payload);
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

// {"addedUser":{"_id":"646f8122969d59cfd925cb76","email":"ksahtmlcss@gmail.com","rememberMe":false,"isAdmin":false,"name":"ksahtmlcss@gmail.com","verified":false,"publicCardPacksCount":0,"created":"2023-05-25T15:39:14.740Z","updated":"2023-05-25T15:39:14.740Z","__v":0}}

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
