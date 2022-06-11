import { fromNullable, isSome } from "fp-ts/lib/Option";
import * as O from "optics-ts";
import { pipe } from "ts-opt";

import { BaseAction } from "../actions";
import * as authActionTypes from "../actions/auth";
import { AuthState, AuthInitialState } from "../interfaces/reducers/authState";
import { Handlers } from "../interfaces/reducers/index";
import { getUserFromToken } from "../utils/helpers/secureStorage";

// Lens
const stateLens = O.optic<AuthState>();
// Functions
const AUTH_LOGIN_REQUESTED = (state: AuthState, _action: authActionTypes.LoginAction) => {
    return pipe(state, O.set(stateLens.prop("loginStatus").prop("isSubmiting"))(true));
};

const AUTH_LOGIN_SUCCESS = (state: AuthState, action: authActionTypes.LoginSuccessAction) => {
    return pipe(
        state,
        O.set(stateLens.prop("user").prop("isFetching"))(false),
        O.set(stateLens.prop("user").prop("fetched"))(true),
        O.set(stateLens.prop("user").prop("data"))(getUserFromToken(action.payload.accessToken)),
        O.set(stateLens.prop("loginStatus").prop("isSubmiting"))(false),
        O.set(stateLens.prop("accessToken"))(action.payload.accessToken),
        O.set(stateLens.prop("refreshToken"))(action.payload.refreshToken),
    );
};

const AUTH_LOGIN_ERROR = (state: AuthState, _action: authActionTypes.LoginAction) => {
    return pipe(state, O.set(stateLens.prop("loginStatus").prop("isSubmiting"))(false));
};

const AUTH_REGISTER_REQUESTED = (state: AuthState, _action: authActionTypes.RegisterAction) => {
    return pipe(state, O.set(stateLens.prop("registerStatus").prop("isFetching"))(true));
};

const AUTH_REGISTER_SUCCESS = (state: AuthState, action: authActionTypes.RegisterSuccessAction) => {
    return pipe(
        state,
        O.set(stateLens.prop("registerStatus").prop("isFetching"))(false),
        O.set(stateLens.prop("registerStatus").prop("fetched"))(true),
        O.set(stateLens.prop("registerStatus").prop("data"))(action.payload),
    );
};

const AUTH_REGISTER_ERROR = (state: AuthState, _action: BaseAction) => {
    return pipe(
        state,
        O.set(stateLens.prop("registerStatus").prop("isFetching"))(false),
        O.set(stateLens.prop("registerStatus").prop("fetched"))(true),
    );
};

const AUTH_REGISTER_CLEAR = (state: AuthState, _action: BaseAction) => {
    return pipe(state, O.set(stateLens.prop("registerStatus"))(undefined));
};

const AUTH_REFRESH_ACCESS_TOKEN_FIRST_INIT_REQUESTED = (
    state: AuthState,
    _action: authActionTypes.RefreshAccessTokenSuccessAction,
) => {
    return pipe(
        state,
        O.set(stateLens.prop("user").prop("isFetching"))(true),
        O.set(stateLens.prop("user").prop("fetched"))(false),
    );
};

const AUTH_REFRESH_ACCESS_TOKEN_SUCCESS = (
    state: AuthState,
    action: authActionTypes.RefreshAccessTokenSuccessAction,
) => {
    return pipe(
        state,
        O.set(stateLens.prop("user").prop("isFetching"))(false),
        O.set(stateLens.prop("user").prop("fetched"))(true),
        O.set(stateLens.prop("user").prop("data"))(getUserFromToken(action.payload.accessToken)),
        O.set(stateLens.prop("accessToken"))(action.payload.accessToken),
        O.set(stateLens.prop("refreshToken"))(action.payload.refreshToken),
    );
};

const AUTH_SET_USER_IS_FETCHING_REQUESTED = (state: AuthState, action: authActionTypes.SetUserIsFetchingAction) => {
    return pipe(state, O.set(stateLens.prop("user").prop("isFetching"))(action.state));
};

const AUTH_LOGOUT_REQUESTED = (state: AuthState, _action: authActionTypes.LogoutAction) => {
    return pipe(state, O.set(stateLens.prop("logoutStatus").prop("isSubmiting"))(true));
};

const AUTH_LOGOUT_SUCCESS = (state: AuthState, _action: authActionTypes.LogoutSuccessAction) => {
    return pipe(state, O.set(stateLens)(AuthInitialState));
};

const actionHandlers: Handlers<AuthState> = {
    AUTH_LOGIN_REQUESTED,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_ERROR,
    AUTH_REGISTER_REQUESTED,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_ERROR,
    AUTH_REGISTER_CLEAR,
    AUTH_REFRESH_ACCESS_TOKEN_SUCCESS,
    AUTH_REFRESH_ACCESS_TOKEN_FIRST_INIT_REQUESTED,
    AUTH_SET_USER_IS_FETCHING_REQUESTED,
    AUTH_LOGOUT_SUCCESS,
    AUTH_LOGOUT_REQUESTED,
};

const authReducer = (state: AuthState = AuthInitialState, action) => {
    return isSome(fromNullable(actionHandlers[action.type])) ? actionHandlers[action.type](state, action) : state;
};

export { authReducer };
