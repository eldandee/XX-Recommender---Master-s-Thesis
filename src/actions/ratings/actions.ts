import {
    FetchUserInfoAction,
    FetchUserRatingsAction,
    CreateUserRatingsAction,
    UpdateUserRatingAction,
    UpdateRatingDtoRequest,
    DeleteUserRatingAction,
    DeleteAllUserRatingsAction,
    FetchUserInfoSuccessAction,
    FetchUserRatingsSuccessAction,
    CreateUserRatingsSuccessAction,
    UpdateUserRatingSuccessAction,
    DeleteUserRatingSuccessAction,
    DeleteAllUserRatingsSuccessAction,
    SetUserInfoIsFetchingAction,
    sortBy,
    sortOrder,
} from ".";
import { BaseAction } from "../";
import {
    RatingDtoRequest,
    UserRatingsListResponseDto,
    MessageResponseDto,
    UserRatingsInfoDto,
    UserRatingDto,
} from "../../api/movies/generated";
import { createActionSet } from "../../utils";

// api actions
export const RATINGS_USER_INFO = createActionSet("RATINGS_USER_INFO");
export const RATINGS_USER_LIST = createActionSet("RATINGS_USER_LIST");
export const RATINGS_CREATE_LIST = createActionSet("RATINGS_CREATE_LIST");
export const RATINGS_UPDATE_RATING = createActionSet("RATINGS_UPDATE_RATING");
export const RATINGS_DELETE_RATING = createActionSet("RATINGS_DELETE_RATING");
export const RATINGS_DELETE_ALL = createActionSet("RATINGS_DELETE_ALL");
export const SET_USER_INFO_IS_FETCHING = createActionSet("SET_USER_INFO_IS_FETCHING");
export const RATINGS_RESET_STATE = createActionSet("RATINGS_RESET_STATE");

export const fetchUserInfo = (): FetchUserInfoAction => ({
    type: RATINGS_USER_INFO.REQUESTED,
});

export const fetchUserInfoSuccess = (status: number, payload: UserRatingsInfoDto): FetchUserInfoSuccessAction => ({
    type: RATINGS_USER_INFO.SUCCESS,
    status,
    payload,
});

export const fetchUserRatings = (
    loadType: "search" | "loadMore",
    title: string,
    pageSize: number,
    pageNumber: number,
    sortBy: sortBy = "ratedAt",
    sortOrder: sortOrder = "desc",
): FetchUserRatingsAction => ({
    type: RATINGS_USER_LIST.REQUESTED,
    loadType,
    title,
    pageSize,
    pageNumber,
    sortBy,
    sortOrder,
});

export const fetchUserRatingsSuccess = (
    status: number,
    payload: { list: UserRatingDto[]; data: UserRatingsListResponseDto },
): FetchUserRatingsSuccessAction => ({
    type: RATINGS_USER_LIST.SUCCESS,
    status,
    payload,
});

export const createUserRatings = (ratingsList: RatingDtoRequest[]): CreateUserRatingsAction => ({
    type: RATINGS_CREATE_LIST.REQUESTED,
    ratingsList,
});

export const createUserRatingsSuccess = (
    status: number,
    payload: MessageResponseDto,
): CreateUserRatingsSuccessAction => ({
    type: RATINGS_CREATE_LIST.SUCCESS,
    status,
    payload,
});

export const updateUserRating = (ratingId: string, payload: UpdateRatingDtoRequest): UpdateUserRatingAction => ({
    type: RATINGS_UPDATE_RATING.REQUESTED,
    ratingId,
    payload,
});

export const updateUserRatingSuccess = (
    status: number,
    payload: MessageResponseDto,
): UpdateUserRatingSuccessAction => ({
    type: RATINGS_UPDATE_RATING.SUCCESS,
    status,
    payload,
});

export const deleteUserRating = (ratingId: string): DeleteUserRatingAction => ({
    type: RATINGS_DELETE_RATING.REQUESTED,
    ratingId,
});

export const deleteUserRatingSuccess = (
    status: number,
    payload: MessageResponseDto,
): DeleteUserRatingSuccessAction => ({
    type: RATINGS_DELETE_RATING.SUCCESS,
    status,
    payload,
});

export const deleteAllUserRatings = (): DeleteAllUserRatingsAction => ({
    type: RATINGS_DELETE_ALL.REQUESTED,
});

export const deleteAllUserRatingsSuccess = (
    status: number,
    payload: MessageResponseDto,
): DeleteAllUserRatingsSuccessAction => ({
    type: RATINGS_DELETE_ALL.SUCCESS,
    status,
    payload,
});

export const setUserInfoIsFetching = (state: boolean): SetUserInfoIsFetchingAction => ({
    type: SET_USER_INFO_IS_FETCHING.REQUESTED,
    state,
});

export const resetRatingsState = (): BaseAction => ({
    type: RATINGS_RESET_STATE.REQUESTED,
});
