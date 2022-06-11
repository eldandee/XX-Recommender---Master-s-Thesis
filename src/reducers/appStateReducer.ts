import { fromNullable, isSome } from "fp-ts/lib/Option";
import * as O from "optics-ts";
import { pipe } from "ts-opt";

import { SetAppReadyStateAction } from "../actions/app/index";
import { AppState, AppStateInitialState } from "../interfaces/reducers/appState";
import { Handlers } from "../interfaces/reducers/index";

// Lens
const stateLens = O.optic<AppState>();
// Functions
const SET_APP_READY_STATE = (state: AppState, action: SetAppReadyStateAction) => {
    return pipe(state, O.set(stateLens.prop("ready"))(action.ready));
};

const actionHandlers: Handlers<AppState> = {
    SET_APP_READY_STATE,
};

const appStateReducer = (state: AppState = AppStateInitialState, action) => {
    return isSome(fromNullable(actionHandlers[action.type])) ? actionHandlers[action.type](state, action) : state;
};

export { appStateReducer };
