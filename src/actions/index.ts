import * as apiErrorHandling from "./apiErrorHandling/actions";
import * as app from "./app/actions";
import * as auth from "./auth/actions";
import * as movies from "./movies/actions";
import * as ratings from "./ratings/actions";
import * as recommendations from "./recommendations/actions";
export interface BaseAction {
    type: string;
}

export interface SuccessAction<T = void> extends BaseAction {
    status: number;
    payload?: T;
}

export interface PaginationAction extends BaseAction {
    pageSize: number;
    pageNumber: number;
}

export const actions = {
    movies: {
        ...movies,
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
    apiErrorHandling: {
        ...apiErrorHandling,
    },
};
