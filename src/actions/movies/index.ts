import { PaginationAction, BaseAction, SuccessAction } from "../";
import {
    MoviesListResponseDto,
    MovieDetailResponseDto,
    MovieDto,
    MostPopularMoviesListResponseDto,
} from "../../api/movies/generated";

export interface FetchMoviesAction extends PaginationAction {
    loadType: "search" | "loadMore";
    title: string;
}

export type FetchMoviesSuccessAction = SuccessAction<{ list: MovieDto[]; data: MoviesListResponseDto }>;

export interface FetchMovieDetailAction extends BaseAction {
    id: string;
}

export type FetchMovieDetailSuccessAction = SuccessAction<MovieDetailResponseDto>;

export interface FetchPopularMoviesListAction extends BaseAction {
    k: number;
}

export type FetchPopularMoviesListSuccessAction = SuccessAction<MostPopularMoviesListResponseDto>;

export type ResetMoviesStateAction = BaseAction;
