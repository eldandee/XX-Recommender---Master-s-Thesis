import { actions } from "../actions";
import { FetchRecommendationsListAction } from "../actions/recommendations";
import * as recommendationsActions from "../actions/recommendations/actions";
import { RecommendationsApi } from "../api/movies/generated";
import { put, takeEvery, call } from "./";
import { safe } from "./helpers";

function* fetchRecommendationsList(action: FetchRecommendationsListAction) {
    const movies = yield* call([new RecommendationsApi(), "recommendationsGet"], action.k, action.recommenderType);
    yield* put(actions.recommendations.fetchRecommendationsListSuccess(movies.status, movies.data));
}

function* recommendationsSaga() {
    yield* takeEvery(recommendationsActions.RECOMMENDATIONS_LIST.REQUESTED, safe(fetchRecommendationsList));
}

export { recommendationsSaga };
