import { BaseAction, SuccessAction } from "../";
import { MessageResponseDto } from "../../api/movies/generated";
import { LoginResponseDto, RefreshAccessTokenResponseDto } from "../../api/responses";

export interface LoginAction extends BaseAction {
    email: string;
    password: string;
}

export type LoginSuccessAction = SuccessAction<LoginResponseDto>;

export interface RegisterAction extends BaseAction {
    username: string;
    email: string;
    password: string;
}

export type RegisterSuccessAction = SuccessAction<MessageResponseDto>;

export interface RefreshAccessTokenAction extends BaseAction {
    refreshToken: string;
}

export type RefreshAccessTokenSuccessAction = SuccessAction<RefreshAccessTokenResponseDto & { refreshToken: string }>;

export interface SetUserIsFetchingAction extends BaseAction {
    state: boolean;
}

export interface LogoutAction extends BaseAction {
    accessToken: string;
}
export type LogoutSuccessAction = SuccessAction<MessageResponseDto>;
