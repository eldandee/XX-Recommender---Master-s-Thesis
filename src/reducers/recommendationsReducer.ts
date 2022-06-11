import { fromNullable, isSome } from "fp-ts/lib/Option";
import * as O from "optics-ts";
import { pipe } from "ts-opt";

import * as recommendationsActionTypes from "../actions/recommendations";
import { Handlers } from "../interfaces/reducers/index";
import { RecommendationsInitialState, RecommendationsState } from "../interfaces/reducers/recommendationsState";

// Lens
const stateLens = O.optic<RecommendationsState>();
// Functions
const RECOMMENDATIONS_LIST_REQUESTED = (
    state: RecommendationsState,
    _action: recommendationsActionTypes.FetchRecommendationsListAction,
) => {
    if (action.loadType === "init") {
        return pipe(
            state,
            O.set(stateLens.prop("recommendedMovies").prop("isFetching"))(true),
            O.set(stateLens.prop("recommendedMovies").prop("fetched"))(false),
            O.set(stateLens.prop("recommendedMovies").prop("data").prop("items"))([]),
            O.set(stateLens.prop("recommenderType"))(action.recommenderType),
        );
    }
    return pipe(
        state,
        O.set(stateLens.prop("recommendedMovies").prop("isFetching"))(true),
        O.set(stateLens.prop("recommendedMovies").prop("fetched"))(false),
        O.set(stateLens.prop("recommenderType"))(action.recommenderType),
    );
};

const RECOMMENDATIONS_LIST_SUCCESS = (
    state: RecommendationsState,
    action: recommendationsActionTypes.FetchRecommendationsListSuccessAction,
) => {
    return pipe(
        state,
        O.set(stateLens.prop("recommendedMovies").prop("isFetching"))(false),
        O.set(stateLens.prop("recommendedMovies").prop("fetched"))(true),
        O.set(stateLens.prop("recommendedMovies").prop("data"))(action.payload),
    );
};

const RECOMMENDATIONS_RESET_STATE_REQUESTED = (
    state: RecommendationsState,
    _action: recommendationsActionTypes.ResetRecommendationsStateAction,
) => {
    return pipe(state, O.set(stateLens)(RecommendationsInitialState));
};

const actionHandlers: Handlers<RecommendationsState> = {
    RECOMMENDATIONS_LIST_REQUESTED,
    RECOMMENDATIONS_LIST_SUCCESS,
    RECOMMENDATIONS_RESET_STATE_REQUESTED,
};

const recommendationsReducer = (state: RecommendationsState = RecommendationsInitialState, action) => {
    return isSome(fromNullable(actionHandlers[action.type])) ? actionHandlers[action.type](state, action) : state;
};

export { recommendationsReducer };
