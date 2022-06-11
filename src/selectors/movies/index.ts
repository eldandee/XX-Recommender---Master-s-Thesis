import { MoviesState } from "../../interfaces/reducers/moviesState";
import { RootState } from "../../store/configureStore";

const getMovies = (state: RootState): MoviesState => state.movies;

export { getMovies };
