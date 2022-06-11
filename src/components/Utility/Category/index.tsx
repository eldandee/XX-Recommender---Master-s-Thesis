import { useTheme, ListProps } from "@ui-kitten/components";
import React from "react";
import { Text, View, ViewProps } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

type CategoryListProps = Omit<ListProps, "renderItem">;
type CategoryListItem = string;

const CategoryList = (props: CategoryListProps): React.ReactElement<ViewProps> => {
    const tailwind = useTailwind();
    const theme = useTheme();
    const { style, data, ...viewProps } = props;

    const renderItem = (item: CategoryListItem, index: number): React.ReactElement => {
        return item ? (
            <View
                key={index}
                style={[
                    tailwind("px-3 py-1 my-1 rounded-full mx-1"),
                    { backgroundColor: theme["color-primary-default"] },
                ]}>
                <Text style={tailwind("text-white")}>{item}</Text>
            </View>
        ) : null;
    };

    return (
        <View {...viewProps} style={[tailwind("flex-row"), style]}>
            {data.map(renderItem)}
        </View>
    );
};

export { CategoryList };
export type { CategoryListProps, CategoryListItem };
