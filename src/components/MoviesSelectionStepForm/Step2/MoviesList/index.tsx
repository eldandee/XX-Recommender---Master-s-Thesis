import { Text, List, Icon } from "@ui-kitten/components";
import React from "react";
import { View, Pressable } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

import { MovieDto } from "../../../../api/movies/generated";
import { ActivityIndicator } from "../../../Utility/ActivityIndicator";
import { Poster } from "../../../Utility/Poster";

import type { FlatListProps } from "react-native";

interface MovieListProps extends Omit<FlatListProps<Partial<MovieDto>>, "renderItem" | "data"> {
    data: Partial<MovieDto>[];
    handleLoadMore?: () => void;
    isLoadingMore?: boolean;
    onMovieAdd?: (item: Partial<MovieDto>) => void;
}

const MoviesList: React.FC<MovieListProps> = ({ data, handleLoadMore, isLoadingMore, onMovieAdd }) => {
    const tailwind = useTailwind();
    const renderItem = ({ item, _index }: { item: MovieDto; _index: number }) => (
        <View style={tailwind("mx-4 my-1 rounded-xl")}>
            <View style={tailwind("flex-row m-2 items-center justify-center")}>
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
                        </View>
                    </View>
                </View>
                <Pressable
                    style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }, tailwind("flex-wrap flex-col mb-1")]}
                    onPress={() => onMovieAdd(item)}>
                    <Icon name="plus-circle" style={tailwind("w-10 h-10")} fill="#38DCA9" />
                </Pressable>
            </View>
        </View>
    );

    return (
        <List<Partial<MovieDto>>
            style={tailwind("py-1")}
            data={data}
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
