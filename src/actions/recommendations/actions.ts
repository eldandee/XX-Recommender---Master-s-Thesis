import { FetchRecommendationsListAction, FetchRecommendationsListSuccessAction, recommendationType } from ".";
import { BaseAction } from "..";
import { RecommendedMoviesListResponseDto } from "../../api/movies/generated";
import { createActionSet } from "../../utils";

export const RECOMMENDATIONS_LIST = createActionSet("RECOMMENDATIONS_LIST");
export const RECOMMENDATIONS_RESET_STATE = createActionSet("RECOMMENDATIONS_RESET_STATE");

export const fetchRecommendationsList = (
    loadType: "init" | "refresh",
    k: number,
    recommenderType: recommendationType,
): FetchRecommendationsListAction => ({
    type: RECOMMENDATIONS_LIST.REQUESTED,
    loadType,
    k,
    recommenderType,
});

export const fetchRecommendationsListSuccess = (
    status: number,
    payload: RecommendedMoviesListResponseDto,
): FetchRecommendationsListSuccessAction => ({
    type: RECOMMENDATIONS_LIST.SUCCESS,
    status,
    payload,
});

export const resetRecommendationsState = (): BaseAction => ({
    type: RECOMMENDATIONS_RESET_STATE.REQUESTED,
});
