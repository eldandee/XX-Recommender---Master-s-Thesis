import { sortBy, sortOrder } from "../../actions/ratings";
import { UserRatingsInfoDto, UserRatingDto, UserRatingsListResponseDto } from "../../api/movies/generated";
import {
    DataState,
    DataStateInitialState,
    InfiniteScrollList,
    InfiniteScrollListInitialState,
    ApiCallActionState,
    ApiCallActionStateInitialState,
} from "./";

interface RatingsState {
    userRatings: DataState<UserRatingsListResponseDto>;
    userRatingsInfo: DataState<UserRatingsInfoDto>;
    ratingsList: InfiniteScrollList<UserRatingDto, { title: string; sortBy: sortBy; sortOrder: sortOrder }>;
    createRatingsListStatus?: ApiCallActionState;
    deletedAllRatingsStatus?: ApiCallActionState;
}

const RatingsInitialState: RatingsState = {
    userRatings: DataStateInitialState,
    userRatingsInfo: {
        ...DataStateInitialState,
        isFetching: true,
    },
    ratingsList: {
        ...InfiniteScrollListInitialState,
        actualQuery: { title: "", sortBy: "ratedAt", sortOrder: "desc" },
    },
    createRatingsListStatus: ApiCallActionStateInitialState,
    deletedAllRatingsStatus: ApiCallActionStateInitialState,
};

export { RatingsInitialState };
export type { RatingsState };
