import { useNavigation } from "@react-navigation/native";
import { Layout, TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { useTailwind } from "tailwind-rn/dist";

import { actions } from "../../actions";
import { MovieDetail } from "../../components/Movies/MovieDetail";
import * as Icons from "../../components/Utility/Icons";
import { Loading } from "../../components/Utility/Loading";
import { SafeAreaLayout } from "../../components/Utility/SafeArea";
import { MovieDetailNavigatorParams } from "../../navigators/MovieDetail";
import { selectors } from "../../selectors";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/reduxHooks";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type MovieDetailScreenProps = NativeStackScreenProps<MovieDetailNavigatorParams, "MovieDetailScreen">;

const MovieDetailScreen: React.FC<MovieDetailScreenProps> = ({ route }) => {
    const navigation = useNavigation();
    const dispatch = useAppDispatch();
    const movies = useAppSelector(selectors.movies.getMovies);
    const [rating, setRating] = useState<number>(undefined);
    const tailwind = useTailwind();

    const onCreateRating = (rating: number) => {
        dispatch(actions.ratings.createUserRatings([{ movieId: route.params.movieId, rating }]));
    };

    const renderDrawerAction = (): React.ReactElement => (
        <TopNavigationAction
            onPress={() => {
                navigation.goBack();
            }}
            icon={<Icons.ArrowIosBackIcon />}
        />
    );
    useEffect(() => {
        const rateMovieListener = _event => {
            if (rating !== undefined && rating !== movies.movieDetail?.data?.rating?.rating) {
                onCreateRating(rating);
            }
        };
        // first we remove the listener to prevent duplicate calls
        // then we add the listener again
        navigation.removeListener("beforeRemove", rateMovieListener);
        navigation.addListener("beforeRemove", rateMovieListener);
        // we could put this also to onValueChange but this is more efficient and optimized
    }, [navigation, rating, movies.movieDetail?.data?.rating?.rating]);
    useEffect(() => {
        dispatch(actions.movies.fetchMovieDetail(route.params.movieId));
        return () => {
            dispatch(actions.movies.clearMovieDetail());
        };
    }, [dispatch, route.params.movieId]);

    return (
        <SafeAreaLayout style={tailwind("flex-1")} insets="top">
            <TopNavigation alignment="center" title="About Movie" accessoryLeft={renderDrawerAction} />
            <Layout level="2" style={tailwind("flex-1")}>
                {movies.movieDetail.fetched ? (
                    <MovieDetail
                        data={movies.movieDetail.data}
                        onValueChange={(value: number) => {
                            setRating(value);
                        }}
                    />
                ) : (
                    <Loading />
                )}
            </Layout>
        </SafeAreaLayout>
    );
};

export { MovieDetailScreen, MovieDetailScreenProps };
