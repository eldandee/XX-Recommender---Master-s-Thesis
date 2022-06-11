import {
    MoviesListResponseDto,
    MovieDetailResponseDto,
    MovieDto,
    MostPopularMoviesListResponseDto,
} from "../../api/movies/generated";
import { DataState, DataStateInitialState, InfiniteScrollList, InfiniteScrollListInitialState } from "./";

interface MoviesState {
    movies: DataState<MoviesListResponseDto>;
    movieDetail: DataState<MovieDetailResponseDto>;
    popularMovies: DataState<MostPopularMoviesListResponseDto>;
    searchMoviesList: InfiniteScrollList<MovieDto, { title: string }>;
}

const MoviesInitialState: MoviesState = {
    movies: DataStateInitialState,
    movieDetail: DataStateInitialState,
    searchMoviesList: { ...InfiniteScrollListInitialState, actualQuery: { title: "" } },
    popularMovies: DataStateInitialState,
};

export { MoviesInitialState };
export type { MoviesState };
