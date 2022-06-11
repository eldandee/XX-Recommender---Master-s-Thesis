import { put } from "../";
import { actions } from "../../actions";
import { deleteTokens } from "../../api/auth/tokens";

// use case of this is if someone on different device log outs
function* refreshAccessTokenError(_err: any, _action: any) {
    deleteTokens();
    yield* put(actions.ratings.setUserInfoIsFetching(false));
    yield* put(actions.auth.setUserIsFetching(false));
}

function* registerError(err: any, action: any) {
    yield* put(actions.auth.registerError());
    yield put({
        type: "API_CALL_FAIL",
        payload: err,
        actionFail: action.type,
    });
}

function* loginError(err: any, action: any) {
    yield* put(actions.auth.loginError());
    yield put({
        type: "API_CALL_FAIL",
        payload: err,
        actionFail: action.type,
    });
}

export { refreshAccessTokenError, registerError, loginError };
