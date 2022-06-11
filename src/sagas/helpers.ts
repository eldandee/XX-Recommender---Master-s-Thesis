import axios from "axios";
import { call, put } from "redux-saga/effects";

const safe = (saga: any, handler?: any, ...args: any) =>
    function* (action: any) {
        try {
            yield call(saga, ...args, action);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (!handler) {
                    handler = onError;
                }
                yield call(
                    handler,
                    ...args,
                    {
                        error: err?.response?.data,
                    },
                    action,
                );
            } else {
                console.error(err);
            }
        }
    };

function* onError(err: any, action: any) {
    yield put({
        type: "API_CALL_FAIL",
        payload: err,
        actionFail: action.type,
    });
}

export { safe, onError };
