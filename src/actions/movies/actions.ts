import {
    FetchMoviesAction,
    FetchMovieDetailAction,
    FetchPopularMoviesListAction,
    FetchMovieDetailSuccessAction,
    FetchMoviesSuccessAction,
    FetchPopularMoviesListSuccessAction,
} from ".";
import { BaseAction } from "..";
import {
    MoviesListResponseDto,
    MovieDetailResponseDto,
    MovieDto,
    MostPopularMoviesListResponseDto,
} from "../../api/movies/generated";
import { createActionSet } from "../../utils";

export const MOVIES_LIST = createActionSet("MOVIES_LIST");
export const MOVIES_MOVIE_DETAIL = createActionSet("MOVIES_MOVIE_DETAIL");
export const MOVIES_POPULAR_LIST = createActionSet("MOVIES_POPULAR_LIST");
export const MOVIES_RESET_STATE = createActionSet("MOVIES_RESET_STATE");

export const fetchMoviesList = (
    loadType: "search" | "loadMore",
    title: string,
    pageSize: number,
    pageNumber: number,
): FetchMoviesAction => ({
    type: MOVIES_LIST.REQUESTED,
    loadType,
    title,
    pageSize,
    pageNumber,
});

export const fetchMoviesListSuccess = (
    status: number,
    payload: { list: MovieDto[]; data: MoviesListResponseDto },
): FetchMoviesSuccessAction => ({
    type: MOVIES_LIST.SUCCESS,
    status,
    payload,
});

export const fetchMovieDetail = (id: string): FetchMovieDetailAction => ({
    type: MOVIES_MOVIE_DETAIL.REQUESTED,
    id,
});

export const fetchMovieDetailSuccess = (
    status: number,
    payload: MovieDetailResponseDto,
): FetchMovieDetailSuccessAction => ({
    type: MOVIES_MOVIE_DETAIL.SUCCESS,
    status,
    payload,
});

export const clearMovieDetail = (): BaseAction => ({
    type: MOVIES_MOVIE_DETAIL.CLEAR,
});

export const fetchPopularMoviesList = (k: number): FetchPopularMoviesListAction => ({
    type: MOVIES_POPULAR_LIST.REQUESTED,
    k,
});

export const fetchPopularMoviesListSuccess = (
    status: number,
    payload: MostPopularMoviesListResponseDto,
): FetchPopularMoviesListSuccessAction => ({
    type: MOVIES_POPULAR_LIST.SUCCESS,
    status,
    payload,
});

export const resetMoviesState = (): BaseAction => ({
    type: MOVIES_RESET_STATE.REQUESTED,
});
