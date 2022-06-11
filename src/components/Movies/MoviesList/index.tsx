import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, List } from "@ui-kitten/components";
import moment from "moment";
import React from "react";
import { View, TouchableOpacity, RefreshControl } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

import { UserRatingDto, MovieDto } from "../../../api/movies/generated";
import { MainNavigatorParams } from "../../../navigators/Main";
import { ActivityIndicator } from "../../Utility/ActivityIndicator";
import { CategoryList } from "../../Utility/Category";
import { Poster } from "../../Utility/Poster";
import { RateBar } from "../../Utility/RateBar";

import type { FlatListProps } from "react-native";

interface MovieListProps extends Omit<FlatListProps<Partial<UserRatingDto | MovieDto>>, "renderItem" | "data"> {
    data: Partial<UserRatingDto | MovieDto>[];
    type: "category" | "rating";
    refresh?: boolean;
    onRefresh?: () => void;
    isRefreshing?: boolean;
    handleLoadMore?: () => void;
    isLoadingMore?: boolean;
}

// Used to render the list of movies
const MoviesList: React.FC<MovieListProps> = ({
    data,
    type,
    handleLoadMore,
    isLoadingMore,
    refresh = false,
    isRefreshing,
    onRefresh,
    ...props
}) => {
    const navigation = useNavigation<NativeStackNavigationProp<MainNavigatorParams>>();
    const tailwind = useTailwind();
    const renderItem = ({ item, _index }: { item: UserRatingDto | MovieDto; index: number }) => {
        return (
            <View>
                <TouchableOpacity
                    style={tailwind("mx-4 my-1 rounded-xl")}
                    activeOpacity={0.2}
                    onPress={() => {
                        navigation.navigate("MovieDetailNavigation", {
                            screen: "MovieDetailScreen",
                            params: { movieId: item?.movieId },
                        });
                    }}>
                    <View style={tailwind("flex-row m-2 items-center")}>
                        <Poster
                            source={{
                                uri: item?.posterPath,
                            }}
                        />
                        <View style={tailwind("flex-wrap flex-1 flex-col p-2")}>
                            <View style={tailwind("mx-1 mb-1")}>
                                <View style={tailwind("ml-1")}>
                                    <View style={tailwind("flex-row flex-wrap mb-1")}>
                                        <Text style={tailwind("font-bold")}>{item?.title}</Text>
                                    </View>
                                    <Text style={tailwind("text-gray-400")}>{moment(item?.releaseDate).year()}</Text>
                                </View>
                                <View style={tailwind("flex-row flex-wrap")}>
                                    {type === "rating" && "rating" in item ? (
                                        <View style={tailwind("ml-1 mt-3")}>
                                            <RateBar value={item?.rating} size="small" mode="display" />
                                            <Text style={tailwind("text-gray-400 mt-1")}>
                                                {moment(item?.ratedAt).format("DD.MM.YYYY HH:mm:ss")}
                                            </Text>
                                        </View>
                                    ) : (
                                        <CategoryList
                                            style={tailwind("flex-row flex-wrap")}
                                            data={"genres" in item ? item?.genres : []}
                                        />
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <List<Partial<UserRatingDto | MovieDto>>
            refreshControl={
                refresh ? <RefreshControl tintColor="white" refreshing={isRefreshing} onRefresh={onRefresh} /> : null
            }
            style={tailwind("py-1")}
            data={data}
            ListHeaderComponent={props.ListHeaderComponent ? props.ListHeaderComponent : null}
            initialNumToRender={10}
            keyExtractor={(item, _index) => item.movieId}
            renderItem={renderItem}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={1.5}
            ListFooterComponent={() =>
                isLoadingMore ? (
                    <View style={tailwind("flex-row justify-center items-center")}>
                        <ActivityIndicator color="white" animating size="large" />
                    </View>
                ) : null
            }
        />
    );
};

export { MoviesList, MovieListProps };
