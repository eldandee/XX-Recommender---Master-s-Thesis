import { Text, List, Icon } from "@ui-kitten/components";
import React from "react";
import { View, Pressable } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

import { InitValuesType } from "../../";
import { Poster } from "../../../Utility/Poster";
import { RateBar } from "../../../Utility/RateBar";

import type { FlatListProps } from "react-native";

interface MovieListProps extends Omit<FlatListProps<Partial<InitValuesType>>, "renderItem" | "data"> {
    data: Partial<InitValuesType>[];
    onMovieRemove?: (item: Partial<InitValuesType>) => void;
    onMovieRate?: (item: Partial<InitValuesType>, rate: number) => void;
}

const MoviesList: React.FC<MovieListProps> = ({ data, onMovieRemove, onMovieRate }) => {
    const tailwind = useTailwind();
    const renderItem = ({ item, _index }: { item: Partial<InitValuesType>; _index: number }) => (
        <View style={tailwind("mx-4 my-1 rounded-xl")}>
            <View style={tailwind("flex-row m-2 items-center justify-center")}>
                <Poster
                    source={{
                        uri: item?.movie.posterPath,
                    }}
                />
                <View style={tailwind("flex-wrap flex-1 flex-col p-2")}>
                    <View style={tailwind("mx-1 mb-1")}>
                        <View style={tailwind("ml-1")}>
                            <View style={tailwind("flex-row flex-wrap mb-1")}>
                                <Text style={tailwind("font-bold")}>{item?.movie.title}</Text>
                            </View>
                        </View>
                        <View style={tailwind("flex-row flex-wrap")}>
                            <View style={tailwind("ml-1 mt-3")}>
                                <RateBar
                                    value={item?.rating}
                                    size="large"
                                    mode="selection"
                                    onValueChange={value => onMovieRate(item, value)}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <Pressable
                    style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }, tailwind("flex-wrap flex-col mb-1")]}
                    onPress={() => onMovieRemove(item)}>
                    <Icon name="minus-circle" style={tailwind("w-10 h-10")} fill="#DE4675" />
                </Pressable>
            </View>
        </View>
    );

    return (
        <List<Partial<InitValuesType>>
            style={tailwind("py-1")}
            data={data}
            keyExtractor={(item, _index) => item.movieId}
            renderItem={renderItem}
        />
    );
};

export { MoviesList, MovieListProps };
