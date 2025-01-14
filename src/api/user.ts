import { post } from '@/http/request';

export type LoginRequest = {
    username: string;
    password: string;
};

// 刷新登录信息需要的参数
export type reLoginRequest = {
    accessToken: string;
};

export type LoginResponse = {
    token?: string;
    username: string;
    accessToken: string;
    roles: string[];
};

export const userLogin = (data?: LoginRequest) => {
    return post<LoginResponse>({}, '/login', data);
};

export const refreshUserData = async (data?: reLoginRequest) => {
    return post<LoginResponse>({}, '/getUserInfo', data);
};
