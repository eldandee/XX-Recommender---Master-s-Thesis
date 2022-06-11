import { fromNullable, isSome } from "fp-ts/lib/Option";
import * as O from "optics-ts";
import { pipe } from "ts-opt";

import * as ratingsActionTypes from "../actions/ratings";
import { Handlers } from "../interfaces/reducers/index";
import { RatingsInitialState, RatingsState } from "../interfaces/reducers/ratingsState";
// Lens
const stateLens = O.optic<RatingsState>();
// Functions
const RATINGS_USER_INFO_REQUESTED = (state: RatingsState, _action: ratingsActionTypes.FetchUserInfoAction) => {
    return pipe(
        state,
        O.set(stateLens.prop("userRatingsInfo").prop("isFetching"))(true),
        O.set(stateLens.prop("userRatingsInfo").prop("fetched"))(false),
    );
};

const RATINGS_USER_INFO_SUCCESS = (state: RatingsState, action: ratingsActionTypes.FetchUserInfoSuccessAction) => {
    return pipe(
        state,
        O.set(stateLens.prop("userRatingsInfo").prop("isFetching"))(false),
        O.set(stateLens.prop("userRatingsInfo").prop("fetched"))(true),
        O.set(stateLens.prop("userRatingsInfo").prop("data"))(action.payload),
    );
};

const RATINGS_USER_LIST_REQUESTED = (state: RatingsState, action: ratingsActionTypes.FetchUserRatingsAction) => {
    if (action.loadType === "search") {
        return pipe(
            state,
            O.set(stateLens.prop("userRatings").prop("isFetching"))(true),
            O.set(stateLens.prop("userRatings").prop("fetched"))(false),
            O.set(stateLens.prop("ratingsList").prop("items"))([]),
            O.set(stateLens.prop("ratingsList").prop("actualQuery").prop("title"))(action?.title),
            O.set(stateLens.prop("ratingsList").prop("actualQuery").prop("sortBy"))(action?.sortBy),
            O.set(stateLens.prop("ratingsList").prop("actualQuery").prop("sortOrder"))(action?.sortOrder),
        );
    }
    return pipe(
        state,
        O.set(stateLens.prop("userRatings").prop("isFetching"))(true),
        O.set(stateLens.prop("userRatings").prop("fetched"))(false),
    );
};

const RATINGS_USER_LIST_SUCCESS = (state: RatingsState, action: ratingsActionTypes.FetchUserRatingsSuccessAction) => {
    return pipe(
        state,
        O.set(stateLens.prop("userRatings").prop("isFetching"))(false),
        O.set(stateLens.prop("userRatings").prop("fetched"))(true),
        O.set(stateLens.prop("userRatings").prop("data"))(action.payload.data),
        O.set(stateLens.prop("ratingsList").prop("items"))(action.payload.list),
        O.set(stateLens.prop("ratingsList").prop("actualPage"))(action.payload.data.pageNumber),
    );
};

const SET_USER_INFO_IS_FETCHING_REQUESTED = (
    state: RatingsState,
    action: ratingsActionTypes.SetUserInfoIsFetchingAction,
) => {
    return pipe(state, O.set(stateLens.prop("userRatingsInfo").prop("isFetching"))(action.state));
};

const RATINGS_CREATE_LIST_REQUESTED = (state: RatingsState, _action: ratingsActionTypes.CreateUserRatingsAction) => {
    return pipe(
        state,
        O.set(stateLens.prop("userRatings").prop("isFetching"))(true),
        O.set(stateLens.prop("userRatings").prop("fetched"))(false),
        O.set(stateLens.prop("ratingsList").prop("items"))([]),
        O.set(stateLens.prop("createRatingsListStatus").prop("isSubmiting"))(true),
    );
};

const RATINGS_CREATE_LIST_SUCCESS = (
    state: RatingsState,
    _action: ratingsActionTypes.CreateUserRatingsSuccessAction,
) => {
    return pipe(state, O.set(stateLens.prop("createRatingsListStatus").prop("isSubmiting"))(false));
};

const RATINGS_DELETE_ALL_REQUESTED = (state: RatingsState, _action: ratingsActionTypes.DeleteUserRatingAction) => {
    return pipe(state, O.set(stateLens.prop("deletedAllRatingsStatus").prop("isSubmiting"))(true));
};

const RATINGS_DELETE_ALL_SUCCESS = (state: RatingsState, _action: ratingsActionTypes.DeleteUserRatingSuccessAction) => {
    return pipe(state, O.set(stateLens.prop("deletedAllRatingsStatus").prop("isSubmiting"))(false));
};

const RATINGS_RESET_STATE_REQUESTED = (state: RatingsState, _action: ratingsActionTypes.ResetRatingsStateAction) => {
    return pipe(state, O.set(stateLens)(RatingsInitialState));
};

const actionHandlers: Handlers<RatingsState> = {
    RATINGS_USER_INFO_REQUESTED,
    RATINGS_USER_INFO_SUCCESS,
    RATINGS_USER_LIST_REQUESTED,
    RATINGS_USER_LIST_SUCCESS,
    SET_USER_INFO_IS_FETCHING_REQUESTED,
    RATINGS_CREATE_LIST_REQUESTED,
    RATINGS_DELETE_ALL_REQUESTED,
    RATINGS_DELETE_ALL_SUCCESS,
    RATINGS_CREATE_LIST_SUCCESS,
    RATINGS_RESET_STATE_REQUESTED,
};

const ratingsReducer = (state: RatingsState = RatingsInitialState, action) => {
    return isSome(fromNullable(actionHandlers[action.type])) ? actionHandlers[action.type](state, action) : state;
};

export { ratingsReducer };
