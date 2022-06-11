import { BottomSheetView, BottomSheetModal } from "@gorhom/bottom-sheet";
import { Layout, Text, Icon, TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import React, { useRef, useCallback, useEffect, useState } from "react";
import { Platform, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

import { actions } from "../../actions";
import { sortBy, sortOrder } from "../../actions/ratings";
import { MoviesList } from "../../components/Movies/MoviesList";
import { MovieBottomSheet } from "../../components/Utility/BottomSheet";
import { FilterTagOption, FilterTags } from "../../components/Utility/FilterTags";
import * as Icons from "../../components/Utility/Icons";
import { Loading } from "../../components/Utility/Loading";
import { SafeAreaLayout } from "../../components/Utility/SafeArea";
import { SearchInput } from "../../components/Utility/Search";
import { selectors } from "../../selectors";
import { useAppDispatch, useAppSelector } from "../../utils";

const UserRatedScreen = () => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const tailwind = useTailwind();
    const dispatch = useAppDispatch();
    const userRatings = useAppSelector(selectors.ratings.getRatings);

    // basically api call counter because of scroll handler - do not use as actual page number
    // real page number is in movies.searchMoviesList.actualPage
    const [page, setPage] = useState(1);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetRef.current?.present();
    }, []);

    const renderSettingsAction = () => (
        <TopNavigationAction onPress={handlePresentModalPress} icon={Icons.FilterIcon} />
    );

    const sortByOptions: FilterTagOption[] = [
        {
            label: <Text style={tailwind("text-white ml-1")}>Title</Text>,
            key: "title",
        },
        {
            label: <Text style={tailwind("text-white ml-1")}>Rating</Text>,
            key: "rating",
        },
        {
            label: <Text style={tailwind("text-white ml-1")}>Release Year</Text>, // maybe will be change back to release date, so for now we keep naming
            key: "releaseDate",
        },
        {
            label: <Text style={tailwind("text-white ml-1")}>Rated At</Text>,
            key: "ratedAt",
        },
    ];

    const sortOrderOptions: FilterTagOption[] = [
        {
            label: (
                <View style={tailwind("flex-row items-center")}>
                    <Icon fill="white" style={{ width: 12, height: 12 }} name="arrow-upward-outline" />
                    <Text style={tailwind("text-white ml-1")}>Ascending</Text>
                </View>
            ),
            key: "asc",
        },
        {
            label: (
                <View style={tailwind("flex-row items-center")}>
                    <Icon fill="white" style={{ width: 12, height: 12 }} name="arrow-downward-outline" />
                    <Text style={tailwind("text-white ml-1")}>Descending</Text>
                </View>
            ),
            key: "desc",
        },
    ];

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
        if (!userRatings.userRatings.isFetching) {
            if (page > 1) {
                dispatch(
                    actions.ratings.fetchUserRatings(
                        "loadMore",
                        userRatings.ratingsList.actualQuery.title,
                        10,
                        userRatings.ratingsList.actualPage + 1,
                        userRatings.ratingsList.actualQuery.sortBy,
                        userRatings.ratingsList.actualQuery.sortOrder,
                    ),
                );
            } else {
                dispatch(
                    actions.ratings.fetchUserRatings(
                        "search",
                        userRatings.ratingsList.actualQuery.title,
                        10,
                        1,
                        userRatings.ratingsList.actualQuery.sortBy,
                        userRatings.ratingsList.actualQuery.sortOrder,
                    ),
                );
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
                            placeholder="Search in your ratings"
                            value={userRatings.ratingsList.actualQuery.title}
                            accessoryLeft={<Icon name="search" />}
                            textStyle={tailwind("font-semibold text-center")}
                            style={[tailwind("border-0 w-9/12 rounded-2xl")]}
                            onSearch={value => {
                                dispatch(
                                    actions.ratings.fetchUserRatings(
                                        "search",
                                        value,
                                        10,
                                        1,
                                        userRatings.ratingsList.actualQuery.sortBy,
                                        userRatings.ratingsList.actualQuery.sortOrder,
                                    ),
                                );
                                setPage(1);
                            }}
                        />
                    </View>
                )}
                accessoryRight={renderSettingsAction}
            />

            {userRatings?.ratingsList?.items?.length === 0 &&
            // should be oposit every time, except on first load - so its preventing flashing
            (!userRatings?.userRatings?.fetched || userRatings?.userRatings?.isFetching) ? (
                <Loading />
            ) : (
                <MoviesList
                    ListHeaderComponent={
                        <Layout level="2" style={tailwind("flex-row my-1 mx-6 items-baseline")}>
                            <Text style={tailwind("text-xl")}>{userRatings.userRatingsInfo.data.numberOfRatings}</Text>
                            <Text style={tailwind("text-[#808081] text-xl ml-1 ")}>rated movies</Text>
                        </Layout>
                    }
                    handleLoadMore={() => {
                        if (userRatings.userRatings.data.hasNextPage && !userRatings.userRatings.isFetching) {
                            setPage(page + 1);
                        }
                    }}
                    isLoadingMore={userRatings.ratingsList.items.length > 0 && userRatings.userRatings.isFetching}
                    data={userRatings.ratingsList.items}
                    type="rating"
                />
            )}
            <MovieBottomSheet
                innerRef={bottomSheetRef}
                snapPoint={Platform.OS === "android" ? "38%" : "33%"}
                content={
                    <BottomSheetView>
                        <View style={tailwind("flex-col m-4")}>
                            <View style={tailwind("mx-1 mb-1")}>
                                <View style={tailwind("flex-row flex-wrap mb-1")}>
                                    <Text style={tailwind("font-bold text-lg")}>Sort By</Text>
                                </View>
                                <View style={tailwind("flex-row flex-wrap mb-1")}>
                                    <FilterTags
                                        style={tailwind("flex-row flex-wrap")}
                                        options={sortByOptions}
                                        selected={userRatings.ratingsList.actualQuery.sortBy}
                                        onSelect={(key: sortBy) => {
                                            const { title, sortBy, sortOrder } = userRatings.ratingsList.actualQuery;
                                            if (sortBy !== key) {
                                                dispatch(
                                                    actions.ratings.fetchUserRatings(
                                                        "search",
                                                        title,
                                                        10,
                                                        1,
                                                        key,
                                                        sortOrder,
                                                    ),
                                                );
                                                setPage(1);
                                            }
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={tailwind("mx-1 mb-1")}>
                                <View style={tailwind("flex-row flex-wrap mb-1")}>
                                    <Text style={tailwind("font-bold text-lg")}>Sort Order</Text>
                                </View>
                                <View style={tailwind("flex-row flex-wrap mb-1")}>
                                    <FilterTags
                                        style={tailwind("flex-row flex-wrap")}
                                        options={sortOrderOptions}
                                        selected={userRatings.ratingsList.actualQuery.sortOrder}
                                        onSelect={(key: sortOrder) => {
                                            const { title, sortBy, sortOrder } = userRatings.ratingsList.actualQuery;
                                            if (sortOrder !== key) {
                                                dispatch(
                                                    actions.ratings.fetchUserRatings(
                                                        "search",
                                                        title,
                                                        10,
                                                        1,
                                                        sortBy,
                                                        key,
                                                    ),
                                                );
                                                setPage(1);
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

export { UserRatedScreen };
