import { actions } from "../actions";
import { LoginAction, RegisterAction, RefreshAccessTokenAction, LogoutAction } from "../actions/auth";
import * as authActions from "../actions/auth/actions";
import {
    login as loginApicall,
    register as registerApiCall,
    refreshAccessToken as refreshAccessTokenApiCall,
    logout as logoutApiCall,
} from "../api/auth/api";
import { put, takeEvery, call } from "./";
import { refreshAccessTokenError, registerError, loginError } from "./customErrors";
import { safe } from "./helpers";

function* login(action: LoginAction) {
    const tokens = yield* call(loginApicall, action.email, action.password);
    yield put(actions.auth.loginSuccess(tokens.status, tokens.data));
}

function* register(action: RegisterAction) {
    const response = yield* call(registerApiCall, action.username, action.email, action.password);
    yield* put(actions.auth.registerSuccess(response.status, response.data));
}

function* refreshAccessToken(action: RefreshAccessTokenAction) {
    const response = yield* call(refreshAccessTokenApiCall, action.refreshToken);
    yield* put(
        actions.auth.refreshAccessTokenSuccess(response.status, {
            refreshToken: action.refreshToken,
            accessToken: response.data.accessToken,
        }),
    );
}

function* logout(action: LogoutAction) {
    const response = yield* call(logoutApiCall, action.accessToken);
    yield* put(actions.auth.logoutSuccess(response.status, response.data));

    // reset the state
    yield* put(actions.ratings.resetRatingsState());
    yield* put(actions.movies.resetMoviesState());
    yield* put(actions.recommendations.resetRecommendationsState());
    yield* put(actions.auth.setUserIsFetching(false));
    yield* put(actions.ratings.setUserInfoIsFetching(false));
}

function* authSaga() {
    yield* takeEvery(authActions.AUTH_LOGIN.REQUESTED, safe(login, loginError));
    yield* takeEvery(authActions.AUTH_REGISTER.REQUESTED, safe(register, registerError));
    yield* takeEvery(
        authActions.AUTH_REFRESH_ACCESS_TOKEN_FIRST_INIT.REQUESTED,
        safe(refreshAccessToken, refreshAccessTokenError),
    );
    yield* takeEvery(authActions.AUTH_LOGOUT.REQUESTED, safe(logout));
}

export { authSaga };
