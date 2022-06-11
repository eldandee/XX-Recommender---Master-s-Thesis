import { combineReducers } from "redux";

import { apiErrorHandlingReducer as apiErrorHandling } from "../reducers/apiErrorHandlingReducer";
import { appStateReducer as app } from "../reducers/appStateReducer";
import { authReducer as auth } from "../reducers/authReducer";
import { moviesReducer as movies } from "../reducers/moviesReducer";
import { ratingsReducer as ratings } from "../reducers/ratingsReducer";
import { recommendationsReducer as recommendations } from "../reducers/recommendationsReducer";

export default combineReducers({
    movies,
    ratings,
    recommendations,
    apiErrorHandling,
    auth,
    app,
});
