import { Icon, TopNavigation } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

import { actions } from "../../actions";
import { MoviesList } from "../../components/Movies/MoviesList";
import { Loading } from "../../components/Utility/Loading";
import { SafeAreaLayout } from "../../components/Utility/SafeArea";
import { SearchInput } from "../../components/Utility/Search";
import { selectors } from "../../selectors";
import { useAppDispatch, useAppSelector } from "../../utils";

const SearchMoviesScreen = () => {
    const tailwind = useTailwind();
    const dispatch = useAppDispatch();
    const movies = useAppSelector(selectors.movies.getMovies);

    // basically api call counter because of scroll handler - do not use as actual page number
    // real page number is in movies.searchMoviesList.actualPage
    const [page, setPage] = useState(1);

    useEffect(() => {
        /**
         * We can get a little warning here
         *
         * Warning: Can't perform a React state update on an unmounted component.
         * This is a no-op, but it indicates a memory leak in your application.
         * To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
         *
         * It will be removed in a future version of React.
         *
         */
        if (!movies.movies.isFetching) {
            if (page > 1) {
                dispatch(
                    actions.movies.fetchMoviesList(
                        "loadMore",
                        movies.searchMoviesList.actualQuery.title,
                        10,
                        movies.searchMoviesList.actualPage + 1,
                    ),
                );
            } else {
                dispatch(actions.movies.fetchMoviesList("search", movies.searchMoviesList.actualQuery.title, 10, 1));
            }
        }
    }, [page]);
    return (
        <SafeAreaLayout style={tailwind("flex-1")} insets="top">
            <TopNavigation
                alignment="center"
                title={_props => (
                    <View style={tailwind("justify-center items-center flex-1")}>
                        <SearchInput
                            placeholder="Search movie by title"
                            value={movies.searchMoviesList.actualQuery.title}
                            accessoryLeft={<Icon name="search" />}
                            textStyle={tailwind("font-semibold text-center")}
                            style={[tailwind("border-0 rounded-2xl w-9/12")]}
                            onSearch={value => {
                                dispatch(actions.movies.fetchMoviesList("search", value, 10, 1));
                                setPage(1);
                            }}
                        />
                    </View>
                )}
            />
            {movies.searchMoviesList.items.length === 0 && movies.movies.isFetching ? (
                <Loading />
            ) : (
                <MoviesList
                    handleLoadMore={() => {
                        if (movies.movies.data.hasNextPage && !movies.movies.isFetching) {
                            setPage(page + 1);
                        }
                    }}
                    isLoadingMore={movies.searchMoviesList.items.length > 0 && movies.movies.isFetching}
                    data={movies.searchMoviesList.items}
                    type="category"
                />
            )}
        </SafeAreaLayout>
    );
};

export { SearchMoviesScreen };
