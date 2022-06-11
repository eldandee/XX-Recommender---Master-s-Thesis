import { Text } from "@ui-kitten/components";
import moment from "moment";
import React from "react";
import { View, ScrollView, ImageStyle, Dimensions } from "react-native";
import Image from "react-native-image-progress";
import { useTailwind } from "tailwind-rn/dist";

import { MovieDetailResponseDto } from "../../../api/movies/generated";
import { ReadMoreText } from "../../../components/Utility/ReadMoreText";
import { ActivityIndicator } from "../../Utility/ActivityIndicator";
import { CategoryList } from "../../Utility/Category";
import { RateBar } from "../../Utility/RateBar";
import { Runtime } from "../../Utility/Runtime";
import { ExpandableDetailContainer } from "./ExpandableDetailContainer";
import { PersonList } from "./PersonList";
import { SimpleDetailContainer } from "./SimpleDetailContainer";
interface MovieDetailProps {
    data: MovieDetailResponseDto;
    onValueChange: (value: number) => void;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ data, onValueChange }) => {
    const tailwind = useTailwind();

    const backdropSize: Pick<ImageStyle, "width" | "height"> = {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").width / 1.77,
    };

    return (
        <ScrollView style={tailwind("grow-0")} bounces={false}>
            <View style={tailwind("flex-col items-center")}>
                <Image
                    indicator={props => <ActivityIndicator {...props} color="white" size="small" />}
                    indicatorProps={{
                        size: 30,
                        borderWidth: 0,
                    }}
                    source={{
                        uri: data?.backdropPath,
                    }}
                    style={backdropSize}
                    resizeMode="cover"
                />
                <View style={tailwind("flex-col p-4")}>
                    <View style={tailwind("mx-1 mb-1")}>
                        <View style={tailwind("flex-row flex-wrap mb-1")}>
                            <Text style={tailwind("font-bold text-lg")}>{data?.title}</Text>
                        </View>
                        <View style={tailwind("flex-row flex-wrap")}>
                            <Text style={tailwind("text-gray-400")}>{moment(data?.releaseDate).year()}</Text>
                            <Runtime style={tailwind("text-gray-400 ml-2")} runtime={data?.runtime} />
                        </View>
                    </View>
                    <View style={tailwind("flex-row flex-wrap mb-1")}>
                        <CategoryList style={tailwind("flex-row flex-wrap")} data={data?.genres} />
                    </View>
                    <View style={tailwind("w-full mx-1")}>
                        <View style={tailwind("my-3")}>
                            <ReadMoreText
                                readMoreStyle={tailwind("text-gray-400 font-bold")}
                                text={data.overview}
                                textStyle={tailwind("text-gray-400 text-justify")}
                            />
                        </View>
                        <SimpleDetailContainer
                            title="Your rating"
                            extra={
                                <RateBar
                                    mode="selection"
                                    size="large"
                                    value={data?.rating?.rating}
                                    onValueChange={number => {
                                        onValueChange(number);
                                    }}
                                />
                            }
                        />
                        <ExpandableDetailContainer title="Cast" content={<PersonList data={data.cast} />} />
                        <ExpandableDetailContainer title="Directors" content={<PersonList data={data.directors} />} />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export { MovieDetail, MovieDetailProps };
