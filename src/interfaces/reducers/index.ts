export interface Handlers<T> {
    [type: string]: (state: T, action: any) => T;
}
export interface DataState<T> {
    isFetching: boolean;
    fetched: boolean;
    data?: T;
}

export const DataStateInitialState: DataState<any> = {
    isFetching: false,
    fetched: false,
};

export interface InfiniteScrollList<T, Query> {
    actualPage: number;
    actualQuery: Query;
    items?: T[];
}

export const InfiniteScrollListInitialState: InfiniteScrollList<any, any> = {
    actualPage: 1,
    actualQuery: {},
    items: [],
};

export interface ApiCallActionState {
    isSubmiting: boolean;
}

export const ApiCallActionStateInitialState: ApiCallActionState = {
    isSubmiting: false,
};
