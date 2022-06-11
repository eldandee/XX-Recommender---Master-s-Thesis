// Currently used only on Auth endpoints
export interface GenreDto {
    id: number;
    name: string;
}
export interface TMDBPersonDto {
    name?: string;
    profile_path?: string;
    id?: number;
}

export interface TMDBMovieDetailDto {
    id?: number;
    title?: string;
    releaseDate?: string;
    posterPath?: string;
    backdropPath?: string;
    genres?: GenreDto[];
    overview?: string;
    runtime?: number; // in minutes
}

export interface MovieDetailRatingDto {
    _id?: string;
    rating?: number;
}

export interface MovieDto {
    movieId?: string;
    title?: string;
    releaseDate?: string;
    posterPath?: string;
    genres: string[];
}

export interface PersonDto {
    name?: string;
    profilePath?: string;
    id?: number;
}

export interface CastPersonDto extends PersonDto {
    character?: string;
}
export interface MovieDetailResponseDto extends MovieDto {
    // extended info
    backdropPath?: string;
    overview?: string;
    runtime?: number; // in minutes
    cast?: CastPersonDto[];
    crew?: PersonDto[];
    directors?: PersonDto[];
    // rating of user on movie
    rating?: MovieDetailRatingDto;
}

// login dtos
export interface MessageResponseDto {
    message?: string;
}

export interface LoginResponseDto {
    accessToken: string;
    refreshToken: string;
}

export interface RefreshAccessTokenResponseDto {
    accessToken: string;
}

export interface ListPaginationResponseDto {
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}
export interface MoviesListResponseDto extends ListPaginationResponseDto {
    items: Partial<MovieDto>[];
}

export interface UserRatingDto {
    _id: string;
    rating: number;
    ratedAt: Date;
    movieId: string;
    title: string;
    releaseDate: string;
    posterPath: string;
}

export interface UserRatingsListResponseDto extends ListPaginationResponseDto {
    items: Partial<UserRatingDto>[];
}

export interface NonPaginatedMoviesListResponseDto {
    items: Partial<MovieDto[]>;
}
