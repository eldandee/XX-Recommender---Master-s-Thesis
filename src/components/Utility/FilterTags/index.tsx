import { useTheme } from "@ui-kitten/components";
import React from "react";
import { Pressable, View, ViewProps } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
interface FilterTagOption {
    key: string;
    label: JSX.Element;
}

interface FilterTagsProps extends ViewProps {
    options: FilterTagOption[];
    selected: string;
    onSelect: (key: string) => void;
}

// Custom filter as TAGS
const FilterTags = ({ options, selected, onSelect, ...viewProps }): React.ReactElement<ViewProps> => {
    const tailwind = useTailwind();
    const theme = useTheme();

    const renderItem = (item: FilterTagOption, index: number): React.ReactElement => (
        <Pressable
            key={index}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1.0 }]}
            onPress={() => onSelect(item.key)}>
            <View
                style={[
                    tailwind("px-3 py-1 my-1 rounded-full mx-1"),
                    {
                        backgroundColor:
                            item.key === selected ? theme["color-primary-default"] : theme["text-hint-color"],
                    },
                ]}>
                {item.label}
            </View>
        </Pressable>
    );

    return (
        <View {...viewProps} style={[tailwind("flex-row"), viewProps.style]}>
            {options.map(renderItem)}
        </View>
    );
};

export { FilterTags, FilterTagsProps, FilterTagOption };
