import { BottomSheetView, BottomSheetModal } from "@gorhom/bottom-sheet";
import { Text, TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import React, { useCallback, useEffect, useRef } from "react";
import { Platform, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

import { actions } from "../../actions";
import { recommendationType } from "../../actions/recommendations";
import { MoviesList } from "../../components/Movies/MoviesList";
import { MovieBottomSheet } from "../../components/Utility/BottomSheet";
import { FilterTagOption, FilterTags } from "../../components/Utility/FilterTags";
import * as Icons from "../../components/Utility/Icons";
import { Loading } from "../../components/Utility/Loading";
import { SafeAreaLayout } from "../../components/Utility/SafeArea";
import { selectors } from "../../selectors";
import { useAppDispatch, useAppSelector } from "../../utils";
import { NUMBER_OF_MOVIES_TO_RECOMMEND } from "../../utils/consts";

const RecommendedMoviesScreen = () => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const tailwind = useTailwind();
    const handlePresentModalPress = useCallback(() => {
        bottomSheetRef.current?.present();
    }, []);
    const dispatch = useAppDispatch();
    const recommendations = useAppSelector(selectors.recommendations.getRecommendations);

    const renderSettingsAction = () => (
        <TopNavigationAction onPress={handlePresentModalPress} icon={Icons.SettingsIcon} />
    );

    const sortByOptions: FilterTagOption[] = [
        {
            label: <Text style={tailwind("text-white ml-1")}>Ratings based</Text>,
            key: "cf",
        },
        {
            label: <Text style={tailwind("text-white ml-1")}>Metadata based</Text>,
            key: "cb",
        },
        {
            label: <Text style={tailwind("text-white ml-1")}>Hybrid</Text>,
            key: "hybrid",
        },
    ];

    useEffect(() => {
        if (!recommendations?.recommendedMovies?.fetched) {
            dispatch(
                actions.recommendations.fetchRecommendationsList(
                    "init",
                    NUMBER_OF_MOVIES_TO_RECOMMEND,
                    recommendations.recommenderType,
                ),
            );
        }
    }, []);

    return (
        <SafeAreaLayout style={tailwind("flex-1")} insets="top">
            <TopNavigation alignment="center" title="Recommended Movies" accessoryRight={renderSettingsAction} />
            {recommendations?.recommendedMovies?.data?.items?.length === 0 &&
            recommendations.recommendedMovies?.isFetching ? (
                <Loading />
            ) : (
                <MoviesList
                    data={recommendations?.recommendedMovies?.data?.items || []}
                    type="category"
                    refresh={true}
                    onRefresh={() => {
                        dispatch(
                            actions.recommendations.fetchRecommendationsList(
                                "refresh",
                                NUMBER_OF_MOVIES_TO_RECOMMEND,
                                recommendations.recommenderType,
                            ),
                        );
                    }}
                    isRefreshing={
                        recommendations.recommendedMovies.isFetching &&
                        recommendations?.recommendedMovies?.data?.items?.length > 0
                    }
                />
            )}
            <MovieBottomSheet
                innerRef={bottomSheetRef}
                snapPoint={Platform.OS === "android" ? "28%" : "23%"}
                content={
                    <BottomSheetView>
                        <View style={tailwind("flex-col m-4")}>
                            <View style={tailwind("mx-1 mb-1")}>
                                <View style={tailwind("flex-row flex-wrap mb-1")}>
                                    <Text style={tailwind("font-bold text-lg")}>Recommender type</Text>
                                </View>
                                <View style={tailwind("flex-row flex-wrap mb-1")}>
                                    <FilterTags
                                        style={tailwind("flex-row flex-wrap")}
                                        options={sortByOptions}
                                        selected={recommendations.recommenderType}
                                        onSelect={(key: recommendationType) => {
                                            if (recommendations.recommenderType !== key) {
                                                dispatch(
                                                    actions.recommendations.fetchRecommendationsList(
                                                        "init",
                                                        NUMBER_OF_MOVIES_TO_RECOMMEND,
                                                        key,
                                                    ),
                                                );
                                            }
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </BottomSheetView>
                }
            />
        </SafeAreaLayout>
    );
};

export { RecommendedMoviesScreen };
