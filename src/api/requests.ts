// Currently used only on Auth endpoints
export interface PaginatedListQueryParams {
    pageNumber: number;
    pageSize: number;
}

export interface SortByQueryParams<T> {
    sortBy?: T;
    sortOrder?: string;
}

export interface MoviesSearchRequest extends PaginatedListQueryParams {
    title?: string;
}

export interface MoviesDetailRequest {
    id: string;
}

export interface RegisterUserRequest {
    username: string;
    email: string;
    password: string;
}

export interface LoginUserRequest {
    email: string;
    password: string;
}

export interface RefreshAccessTokenRequest {
    refreshToken: string;
}

export interface RatingDtoRequest {
    movieId: string;
    rating: number;
}
export interface CreateRatingsRequest {
    ratings: RatingDtoRequest[];
}

export interface UpdateRatingRequest {
    ratingId: string;
}
export interface UpdateRatingRequestBody {
    ratingId: string;
    rating: number;
}

export interface DeleteRatingRequest {
    ratingId: string;
}

type RatingsSortBy = "title" | "releaseDate" | "ratedAt" | "rating";
export interface RatingsSearchRequest extends PaginatedListQueryParams, SortByQueryParams<RatingsSortBy> {
    title?: string;
}
export interface RecommendMoviesRequest {
    k: number;
    type: string;
}

export interface MostPopularMovieRequest {
    k: number;
}
