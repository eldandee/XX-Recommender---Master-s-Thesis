import { fromNullable, isSome } from "fp-ts/lib/Option";
import * as O from "optics-ts";
import { pipe } from "ts-opt";

import { BaseAction } from "../actions";
import * as movieActionTypes from "../actions/movies";
import { Handlers } from "../interfaces/reducers/index";
import { MoviesInitialState, MoviesState } from "../interfaces/reducers/moviesState";
// Lens
const stateLens = O.optic<MoviesState>();
// Functions
const MOVIES_LIST_REQUESTED = (state: MoviesState, action: movieActionTypes.FetchMoviesAction) => {
    if (action.loadType === "search") {
        return pipe(
            state,
            O.set(stateLens.prop("movies").prop("isFetching"))(true),
            O.set(stateLens.prop("movies").prop("fetched"))(false),
            O.set(stateLens.prop("searchMoviesList").prop("items"))([]),
            O.set(stateLens.prop("searchMoviesList").prop("actualQuery").prop("title"))(action?.title),
        );
    }
    return pipe(
        state,
        O.set(stateLens.prop("movies").prop("isFetching"))(true),
        O.set(stateLens.prop("movies").prop("fetched"))(false),
    );
};

const MOVIES_LIST_SUCCESS = (state: MoviesState, action: movieActionTypes.FetchMoviesSuccessAction) => {
    return pipe(
        state,
        O.set(stateLens.prop("movies").prop("isFetching"))(false),
        O.set(stateLens.prop("movies").prop("fetched"))(true),
        O.set(stateLens.prop("movies").prop("data"))(action.payload.data),
        O.set(stateLens.prop("searchMoviesList").prop("items"))(action.payload.list),
        O.set(stateLens.prop("searchMoviesList").prop("actualPage"))(action.payload.data.pageNumber),
    );
};

const MOVIES_MOVIE_DETAIL_REQUESTED = (state: MoviesState, _action: movieActionTypes.FetchMoviesAction) => {
    return pipe(
        state,
        O.set(stateLens.prop("movieDetail").prop("isFetching"))(true),
        O.set(stateLens.prop("movieDetail").prop("fetched"))(false),
    );
};

const MOVIES_MOVIE_DETAIL_SUCCESS = (state: MoviesState, action: movieActionTypes.FetchMovieDetailSuccessAction) => {
    return pipe(
        state,
        O.set(stateLens.prop("movieDetail").prop("isFetching"))(false),
        O.set(stateLens.prop("movieDetail").prop("fetched"))(true),
        O.set(stateLens.prop("movieDetail").prop("data"))(action.payload),
    );
};

const MOVIES_MOVIE_DETAIL_CLEAR = (state: MoviesState, _action: BaseAction) => {
    return pipe(state, O.set(stateLens.prop("movieDetail"))(MoviesInitialState.movieDetail));
};

const MOVIES_POPULAR_LIST_REQUESTED = (state: MoviesState, _action: movieActionTypes.FetchPopularMoviesListAction) => {
    return pipe(
        state,
        O.set(stateLens.prop("popularMovies").prop("isFetching"))(true),
        O.set(stateLens.prop("popularMovies").prop("fetched"))(false),
    );
};

const MOVIES_POPULAR_LIST_SUCCESS = (
    state: MoviesState,
    action: movieActionTypes.FetchPopularMoviesListSuccessAction,
) => {
    return pipe(
        state,
        O.set(stateLens.prop("popularMovies").prop("isFetching"))(false),
        O.set(stateLens.prop("popularMovies").prop("fetched"))(true),
        O.set(stateLens.prop("popularMovies").prop("data"))(action.payload),
    );
};

const MOVIES_RESET_STATE_REQUESTED = (state: MoviesState, _action: movieActionTypes.ResetMoviesStateAction) => {
    return pipe(state, O.set(stateLens)(MoviesInitialState));
};

const actionHandlers: Handlers<MoviesState> = {
    MOVIES_LIST_REQUESTED,
    MOVIES_LIST_SUCCESS,
    MOVIES_MOVIE_DETAIL_REQUESTED,
    MOVIES_MOVIE_DETAIL_SUCCESS,
    MOVIES_POPULAR_LIST_REQUESTED,
    MOVIES_POPULAR_LIST_SUCCESS,
    MOVIES_MOVIE_DETAIL_CLEAR,
    MOVIES_RESET_STATE_REQUESTED,
};

const moviesReducer = (state: MoviesState = MoviesInitialState, action) => {
    return isSome(fromNullable(actionHandlers[action.type])) ? actionHandlers[action.type](state, action) : state;
};

export { moviesReducer };
