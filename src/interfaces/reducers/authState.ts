import { MessageResponseDto } from "../../api/movies/generated";
import { DataState, DataStateInitialState, ApiCallActionState, ApiCallActionStateInitialState } from "./";

export interface User {
    sub?: string;
    username?: string;
    email?: string;
    iss?: string;
    iat?: number;
    exp?: number;
}

interface AuthState {
    accessToken?: string;
    refreshToken?: string;
    user: DataState<User>;
    loginStatus?: ApiCallActionState;
    registerStatus?: DataState<MessageResponseDto>;
    logoutStatus?: ApiCallActionState;
}

const AuthInitialState: AuthState = {
    user: { ...DataStateInitialState, isFetching: true },
    loginStatus: ApiCallActionStateInitialState, // used on login form
    registerStatus: DataStateInitialState,
    logoutStatus: ApiCallActionStateInitialState,
};

export { AuthInitialState };
export type { AuthState };
