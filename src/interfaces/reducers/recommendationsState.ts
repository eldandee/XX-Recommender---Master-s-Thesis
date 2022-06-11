import { recommendationType } from "../../actions/recommendations";
import { RecommendedMoviesListResponseDto } from "../../api/movies/generated";
import { DataState, DataStateInitialState } from "./";

interface RecommendationsState {
    recommendedMovies: DataState<RecommendedMoviesListResponseDto>;
    recommenderType: recommendationType;
}

const RecommendationsInitialState: RecommendationsState = {
    recommendedMovies: { ...DataStateInitialState, data: { items: [] } },
    recommenderType: "cb" as recommendationType,
};

export { RecommendationsInitialState };
export type { RecommendationsState };
