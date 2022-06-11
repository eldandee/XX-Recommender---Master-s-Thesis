import { BaseAction, SuccessAction } from "../";
import { RecommendedMoviesListResponseDto } from "../../api/movies/generated";

export type recommendationType = "cf" | "cb" | "hybrid";

export interface FetchRecommendationsListAction extends BaseAction {
    loadType: "init" | "refresh";
    k: number;
    recommenderType: recommendationType;
}
export type FetchRecommendationsListSuccessAction = SuccessAction<RecommendedMoviesListResponseDto>;

export type ResetRecommendationsStateAction = BaseAction;
