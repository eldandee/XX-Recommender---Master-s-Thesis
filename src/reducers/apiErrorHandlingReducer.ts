import { fromNullable, isSome } from "fp-ts/lib/Option";
import * as O from "optics-ts";
import { pipe } from "ts-opt";

import { ApiErrorHandlingInitialState, ApiErrorHandlingState } from "../interfaces/reducers/apiErrorHandlingState";
import { Handlers } from "../interfaces/reducers/index";
// Lens
const stateLens = O.optic<ApiErrorHandlingState>();
// Functions
const API_CALL_FAIL = (state: ApiErrorHandlingState, action) => {
    return pipe(
        state,
        O.set(stateLens.prop("error"))(true),
        O.set(stateLens.prop("errorResponse"))(action?.payload?.error),
    );
};

const RESET_API_CALL_ERROR_STATE = (state: ApiErrorHandlingState, _action) => {
    return pipe(state, O.set(stateLens.prop("error"))(false), O.set(stateLens.prop("errorResponse"))(undefined));
};

const actionHandlers: Handlers<ApiErrorHandlingState> = {
    API_CALL_FAIL,
    RESET_API_CALL_ERROR_STATE,
};

const apiErrorHandlingReducer = (state: ApiErrorHandlingState = ApiErrorHandlingInitialState, action) => {
    return isSome(fromNullable(actionHandlers[action.type])) ? actionHandlers[action.type](state, action) : state;
};

export { apiErrorHandlingReducer };
