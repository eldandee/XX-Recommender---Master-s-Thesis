import { Layout, Text, Icon, TopNavigation } from "@ui-kitten/components";
import { FormikContextType, FormikProps, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

import { FormValues } from "../";
import { actions } from "../../../actions";
import { MovieDto } from "../../../api/movies/generated";
import { selectors } from "../../../selectors";
import { useAppDispatch, useAppSelector } from "../../../utils";
import { Loading } from "../../Utility/Loading";
import { SearchInput } from "../../Utility/Search";
import { MoviesList } from "./MoviesList";

type Step2Props = FormikProps<FormValues>;

const Step2Form: React.FC<Step2Props> = () => {
    const tailwind = useTailwind();
    const formikContext: FormikContextType<FormValues> = useFormikContext();
    const dispatch = useAppDispatch();
    const movies = useAppSelector(selectors.movies.getMovies);

    /**
     * Basically api call counter because of scroll handler - do not use as actual page number
     * Real page number is in movies.searchMoviesList.actualPage
     */
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
                if (!movies.movies.fetched) {
                    dispatch(
                        actions.movies.fetchMoviesList("search", movies.searchMoviesList.actualQuery.title, 10, 1),
                    );
                }
            }
        }
    }, [page]);

    return (
        <View style={tailwind("flex-1 w-full")}>
            <TopNavigation
                alignment="center"
                title={_props => (
                    <View style={tailwind("justify-center items-center")}>
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
            <Layout level="1" style={tailwind("p-4 justify-center flex-row")}>
                <Text style={tailwind("text-xl")}>{formikContext.values.ratings.length}</Text>
                <Text style={tailwind("text-[#808081] text-xl ml-1")}>selected movies</Text>
            </Layout>
            {movies.searchMoviesList.items.length === 0 && movies.movies.isFetching ? (
                <Loading />
            ) : (
                <MoviesList
                    style={tailwind("flex-1")}
                    handleLoadMore={() => {
                        if (movies.movies.data.hasNextPage && !movies.movies.isFetching) {
                            setPage(page + 1);
                        }
                    }}
                    onMovieAdd={(movie: MovieDto) => {
                        formikContext.setFieldValue("ratings", [
                            ...formikContext.values.ratings,
                            {
                                movieId: movie.movieId,
                                rating: undefined,
                                movie,
                            },
                        ]);
                    }}
                    isLoadingMore={movies.searchMoviesList.items.length > 0 && movies.movies.isFetching}
                    data={movies.searchMoviesList.items.filter(movie => {
                        return !formikContext.values.ratings.find(rating => rating.movieId === movie.movieId);
                    })}
                />
            )}
        </View>
    );
};

export { Step2Form, Step2Props };
