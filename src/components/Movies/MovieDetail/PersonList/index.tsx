import { Text, List, useTheme } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

import { PersonDto, CastPersonDto } from "../../../../api/movies/generated";
import { ProfileImage } from "../../../Utility/ProfileImage";

interface PersonListProps {
    data: Partial<PersonDto | CastPersonDto>[];
}

const PersonList: React.FC<PersonListProps> = ({ data }) => {
    const theme = useTheme();
    const tailwind = useTailwind();
    const renderItem = ({ item, _index }: { item: CastPersonDto | PersonDto; _index: number }) => (
        <View key={item.id} style={tailwind("flex-row my-2 items-center")}>
            <ProfileImage
                size="small"
                source={{
                    uri: item.profilePath,
                }}
            />
            <View style={tailwind("flex-wrap flex-1 flex-col m-2")}>
                <View style={tailwind("mx-1")}>
                    <View style={tailwind("flex-row flex-wrap")}>
                        <Text style={tailwind("font-bold")}>{item?.name}</Text>
                    </View>
                    {"character" in item && <Text style={tailwind("text-gray-400 mt-1")}>{item?.character}</Text>}
                </View>
            </View>
        </View>
    );
    return (
        <List<Partial<PersonDto | CastPersonDto>>
            style={[tailwind("p-0"), { backgroundColor: theme[`background-basic-color-1`] }]}
            data={data}
            scrollEnabled={false}
            renderItem={renderItem}
        />
    );
};

export { PersonList, PersonListProps };
