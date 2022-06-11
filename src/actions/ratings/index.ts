import { PaginationAction, BaseAction, SuccessAction } from "../";
import {
    MessageResponseDto,
    UserRatingsListResponseDto,
    RatingDtoRequest,
    UserRatingsInfoDto,
    UserRatingDto,
} from "../../api/movies/generated";

export interface UpdateRatingDtoRequest {
    ratingId: string;
    rating: number;
}

export type sortBy = "title" | "ratedAt" | "releaseDate" | "rating";
export type sortOrder = "asc" | "desc";

export type FetchUserInfoAction = BaseAction;
export type FetchUserInfoSuccessAction = SuccessAction<UserRatingsInfoDto>;

export interface FetchUserRatingsAction extends PaginationAction {
    loadType: "search" | "loadMore";
    title: string;
    sortBy: sortBy;
    sortOrder: sortOrder;
}
export type FetchUserRatingsSuccessAction = SuccessAction<{ list: UserRatingDto[]; data: UserRatingsListResponseDto }>;

export interface CreateUserRatingsAction extends BaseAction {
    ratingsList: RatingDtoRequest[];
}
export type CreateUserRatingsSuccessAction = SuccessAction<MessageResponseDto>;

export interface UpdateUserRatingAction extends BaseAction {
    ratingId: string;
    payload: UpdateRatingDtoRequest;
}
export type UpdateUserRatingSuccessAction = SuccessAction<MessageResponseDto>;

export interface DeleteUserRatingAction extends BaseAction {
    ratingId: string;
}
export type DeleteUserRatingSuccessAction = SuccessAction<MessageResponseDto>;

export type DeleteAllUserRatingsAction = BaseAction;
export type DeleteAllUserRatingsSuccessAction = SuccessAction<MessageResponseDto>;

export interface SetUserInfoIsFetchingAction extends BaseAction {
    state: boolean;
}

export type ResetRatingsStateAction = BaseAction;
