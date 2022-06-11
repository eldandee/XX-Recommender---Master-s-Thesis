import * as apiErrorHandling from "./apiErrorHandling";
import * as app from "./app";
import * as auth from "./auth";
import * as movies from "./movies";
import * as ratings from "./ratings";
import * as recommendations from "./recommendations";

export const selectors = {
    movies: {
        ...movies,
    },
    apiErrorHandling: {
        ...apiErrorHandling,
    },
    auth: {
        ...auth,
    },
    app: {
        ...app,
    },
    ratings: {
        ...ratings,
    },
    recommendations: {
        ...recommendations,
    },
};
