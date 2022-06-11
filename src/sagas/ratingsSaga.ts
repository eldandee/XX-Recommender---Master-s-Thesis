import { actions, BaseAction } from "../actions";
import {
    FetchUserRatingsAction,
    CreateUserRatingsAction,
    UpdateUserRatingAction,
    DeleteAllUserRatingsAction,
    DeleteUserRatingAction,
} from "../actions/ratings";
import * as ratingsActions from "../actions/ratings/actions";
import { RatingsApi, UserRatingDto } from "../api/movies/generated";
import { selectors } from "../selectors";
import { put, takeEvery, call, select } from "./";
import { safe } from "./helpers";

function* fetchUserInfo(_action: BaseAction) {
    const userInfo = yield* call([new RatingsApi(), "ratingsInfoGet"]);
    yield put(actions.ratings.fetchUserInfoSuccess(userInfo.status, userInfo.data));
}

function* fetchUserRatings(action: FetchUserRatingsAction) {
    const userRatings = yield* call(
        [new RatingsApi(), "ratingsGet"],
        action.title,
        action.pageNumber,
        action.pageSize,
        action.sortBy,
        action.sortOrder,
    );
    const actualUserRatingsState = yield* select(selectors.ratings.getRatings);
    let finalListOfUserRatings: UserRatingDto[] = [];
    if (action.loadType === "search") {
        finalListOfUserRatings = finalListOfUserRatings.concat(userRatings.data.items);
    } else {
        finalListOfUserRatings = actualUserRatingsState.ratingsList.items.concat(userRatings.data.items);
    }
    yield* put(
        actions.ratings.fetchUserRatingsSuccess(userRatings.status, {
            data: userRatings.data,
            list: finalListOfUserRatings,
        }),
    );
}

function* createUserRatings(action: CreateUserRatingsAction) {
    const response = yield* call([new RatingsApi(), "ratingsPost"], {
        ratings: action?.ratingsList,
    });
    yield* put(actions.ratings.createUserRatingsSuccess(response.status, response.data));
    const actualUserRatingsState = yield* select(selectors.ratings.getRatings);
    yield* put(actions.ratings.fetchUserInfo());
    yield* put(
        actions.ratings.fetchUserRatings(
            "search",
            actualUserRatingsState.ratingsList.actualQuery.title,
            10,
            1,
            actualUserRatingsState.ratingsList.actualQuery.sortBy,
            actualUserRatingsState.ratingsList.actualQuery.sortOrder,
        ),
    );
}
// unused, but kept for future use
function* updateUserRating(action: UpdateUserRatingAction) {
    const response = yield* call([new RatingsApi(), "ratingsRatingIdPut"], action?.ratingId, action?.payload);
    yield* put(actions.ratings.updateUserRatingSuccess(response.status, response.data));
    const actualUserRatingsState = yield* select(selectors.ratings.getRatings);
    yield* put(actions.ratings.fetchUserInfo());
    yield* put(
        actions.ratings.fetchUserRatings(
            "search",
            actualUserRatingsState.ratingsList.actualQuery.title,
            10,
            1,
            actualUserRatingsState.ratingsList.actualQuery.sortBy,
            actualUserRatingsState.ratingsList.actualQuery.sortOrder,
        ),
    );
}

// unused, but kept for future use
function* deleteUserRating(action: DeleteUserRatingAction) {
    const response = yield* call([new RatingsApi(), "ratingsRatingIdDelete"], action.ratingId);
    yield* put(actions.ratings.deleteUserRatingSuccess(response.status, response.data));
}

function* deleteAllUserRatings(_action: DeleteAllUserRatingsAction) {
    const response = yield* call([new RatingsApi(), "ratingsDeleteAllDelete"]);
    yield* put(actions.ratings.deleteAllUserRatingsSuccess(response.status, response.data));

    yield* put(actions.ratings.resetRatingsState());
    yield* put(actions.movies.resetMoviesState());
    yield* put(actions.recommendations.resetRecommendationsState());
    yield* put(actions.ratings.fetchUserInfo());
}

function* ratingsSaga() {
    yield* takeEvery(ratingsActions.RATINGS_USER_INFO.REQUESTED, safe(fetchUserInfo));
    yield* takeEvery(ratingsActions.RATINGS_USER_LIST.REQUESTED, safe(fetchUserRatings));
    yield* takeEvery(ratingsActions.RATINGS_CREATE_LIST.REQUESTED, safe(createUserRatings));
    yield* takeEvery(ratingsActions.RATINGS_UPDATE_RATING.REQUESTED, safe(updateUserRating));
    yield* takeEvery(ratingsActions.RATINGS_DELETE_RATING.REQUESTED, safe(deleteUserRating));
    yield* takeEvery(ratingsActions.RATINGS_DELETE_ALL.REQUESTED, safe(deleteAllUserRatings));
}

export { ratingsSaga };
