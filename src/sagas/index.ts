import {
    call as callTyped,
    put as putTyped,
    select as selectTyped,
    all as allTyped,
    takeEvery as takeEveryTyped,
} from "typed-redux-saga";

import { authSaga } from "./authSaga";
import { moviesSaga } from "./moviesSaga";
import { ratingsSaga } from "./ratingsSaga";
import { recommendationsSaga } from "./recommendationsSaga";

const select = selectTyped;
const call = callTyped;
const put = putTyped;
const takeEvery = takeEveryTyped;

export default function* rootSaga() {
    yield* allTyped([authSaga(), moviesSaga(), ratingsSaga(), recommendationsSaga()]);
}

export { call, put, select, takeEvery };
