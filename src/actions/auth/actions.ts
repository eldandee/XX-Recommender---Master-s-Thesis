import {
    LoginAction,
    LoginSuccessAction,
    RegisterAction,
    RegisterSuccessAction,
    RefreshAccessTokenAction,
    RefreshAccessTokenSuccessAction,
    SetUserIsFetchingAction,
    LogoutAction,
    LogoutSuccessAction,
} from ".";
import { BaseAction } from "..";
import { MessageResponseDto } from "../../api/movies/generated";
import { LoginResponseDto, RefreshAccessTokenResponseDto } from "../../api/responses";
import { createActionSet } from "../../utils";

export const AUTH_LOGIN = createActionSet("AUTH_LOGIN");
export const AUTH_REGISTER = createActionSet("AUTH_REGISTER");
export const AUTH_REFRESH_ACCESS_TOKEN = createActionSet("AUTH_REFRESH_ACCESS_TOKEN");
export const AUTH_REFRESH_ACCESS_TOKEN_FIRST_INIT = createActionSet("AUTH_REFRESH_ACCESS_TOKEN_FIRST_INIT");
export const AUTH_SET_USER_IS_FETCHING = createActionSet("AUTH_SET_USER_IS_FETCHING");
export const AUTH_LOGOUT = createActionSet("AUTH_LOGOUT");

export const login = (email: string, password: string): LoginAction => ({
    type: AUTH_LOGIN.REQUESTED,
    email,
    password,
});

export const loginSuccess = (status: number, payload: LoginResponseDto): LoginSuccessAction => ({
    type: AUTH_LOGIN.SUCCESS,
    status,
    payload,
});

export const loginError = (): BaseAction => ({
    type: AUTH_LOGIN.ERROR,
});

export const register = (username: string, email: string, password: string): RegisterAction => ({
    type: AUTH_REGISTER.REQUESTED,
    username,
    email,
    password,
});

export const registerSuccess = (status: number, payload: MessageResponseDto): RegisterSuccessAction => ({
    type: AUTH_REGISTER.SUCCESS,
    status,
    payload,
});

export const registerError = (): BaseAction => ({
    type: AUTH_REGISTER.ERROR,
});

export const clearRegisterStatus = (): BaseAction => ({
    type: AUTH_REGISTER.CLEAR,
});

export const refreshAccessToken = (refreshToken: string): RefreshAccessTokenAction => ({
    type: AUTH_REFRESH_ACCESS_TOKEN.REQUESTED,
    refreshToken,
});

export const refreshAccessTokenSuccess = (
    status: number,
    payload: RefreshAccessTokenResponseDto & { refreshToken: string },
): RefreshAccessTokenSuccessAction => ({
    type: AUTH_REFRESH_ACCESS_TOKEN.SUCCESS,
    status,
    payload,
});

export const refreshAccessTokenFirstInit = (refreshToken: string): RefreshAccessTokenAction => ({
    type: AUTH_REFRESH_ACCESS_TOKEN_FIRST_INIT.REQUESTED,
    refreshToken,
});

export const setUserIsFetching = (state: boolean): SetUserIsFetchingAction => ({
    type: AUTH_SET_USER_IS_FETCHING.REQUESTED,
    state,
});

export const logout = (accessToken: string): LogoutAction => ({
    type: AUTH_LOGOUT.REQUESTED,
    accessToken,
});

export const logoutSuccess = (status: number, payload: MessageResponseDto): LogoutSuccessAction => ({
    type: AUTH_LOGOUT.SUCCESS,
    status,
    payload,
});
