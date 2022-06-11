import axios, { AxiosResponse } from "axios";

import { BASE_URL } from "../../utils/consts";
import { LoginResponseDto, MessageResponseDto, RefreshAccessTokenResponseDto } from "../responses";
import { setAccessToken, setRefreshToken, deleteTokens } from "./tokens";

const authAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const login = async (email: string, password: string) => {
    return authAxios
        .post<object, AxiosResponse<LoginResponseDto>>("/auth/login", {
            email,
            password,
        })
        .then(async response => {
            if (response.data.accessToken) {
                await setAccessToken(response.data.accessToken);
                await setRefreshToken(response.data.refreshToken);
            }
            // returning back to redux-sagas, while we saved the tokens in local storage/encrypted storage
            return response;
        })
        .catch(error => {
            console.log(error);
            return Promise.reject(error);
        });
};

const register = async (username: string, email: string, password: string) => {
    return authAxios.post<object, AxiosResponse<MessageResponseDto>>("/auth/register", {
        username,
        email,
        password,
    });
};

// called only on reopening the app after that we have axios interceptor
const refreshAccessToken = async (refreshToken: string) => {
    return authAxios.post<object, AxiosResponse<RefreshAccessTokenResponseDto>>("/auth/refreshAccessToken", {
        refreshToken,
    });
};

const logout = async (accessToken: string) => {
    await deleteTokens();
    return authAxios.post<object, AxiosResponse<MessageResponseDto>>("/auth/logout", {}, getConfig(accessToken));
};

const getConfig = (token: string) => {
    return {
        headers: { Authorization: `Bearer ${token}` },
    };
};

export { authAxios, login, logout, register, refreshAccessToken };
