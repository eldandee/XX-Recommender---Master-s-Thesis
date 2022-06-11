import { actions } from "../actions";
import { FetchMovieDetailAction, FetchMoviesAction, FetchPopularMoviesListAction } from "../actions/movies";
import * as moviesActions from "../actions/movies/actions";
import { MoviesApi, MovieDto } from "../api/movies/generated";
import { selectors } from "../selectors";
import { put, takeEvery, call, select } from "./";
import { safe } from "./helpers";

function* fetchMovies(action: FetchMoviesAction) {
    const movies = yield* call([new MoviesApi(), "moviesGet"], action.title, action.pageNumber, action.pageSize);
    const actualMoviesState = yield* select(selectors.movies.getMovies);
    let finalListOfMovies: MovieDto[] = [];
    if (action.loadType === "search") {
        finalListOfMovies = finalListOfMovies.concat(movies.data.items);
    } else {
        finalListOfMovies = actualMoviesState.searchMoviesList.items.concat(movies.data.items);
    }
    yield* put(
        actions.movies.fetchMoviesListSuccess(movies.status, {
            data: movies.data,
            list: finalListOfMovies,
        }),
    );
}

function* fetchMovieDetail(action: FetchMovieDetailAction) {
    const movieDetail = yield* call([new MoviesApi(), "moviesMovieIdGet"], action.id);
    yield* put(actions.movies.fetchMovieDetailSuccess(movieDetail.status, movieDetail.data));
}

function* fetchPopularMoviesList(action: FetchPopularMoviesListAction) {
    const movies = yield* call([new MoviesApi(), "moviesMostPopularGet"], action.k);
    yield* put(actions.movies.fetchPopularMoviesListSuccess(movies.status, movies.data));
}

function* moviesSaga() {
    yield* takeEvery(moviesActions.MOVIES_LIST.REQUESTED, safe(fetchMovies));
    yield* takeEvery(moviesActions.MOVIES_MOVIE_DETAIL.REQUESTED, safe(fetchMovieDetail));
    yield* takeEvery(moviesActions.MOVIES_POPULAR_LIST.REQUESTED, safe(fetchPopularMoviesList));
}

export { moviesSaga };
