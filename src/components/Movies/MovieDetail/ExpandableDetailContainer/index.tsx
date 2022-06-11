import { Text, Button, Layout } from "@ui-kitten/components";
import React, { useState, useCallback } from "react";
import { View, TouchableOpacity } from "react-native";
import Collapsible from "react-native-collapsible";
import { useTailwind } from "tailwind-rn/dist";

import * as Icons from "../../../Utility/Icons";

interface ExpandableDetailContainerProps {
    initExpanded?: boolean;
    title: string;
    content?: JSX.Element;
    onExpandClick?: (state: boolean) => void;
}

// Custom component to display a collapsible container with a title and content because UIKiiten has no collapsible component
const ExpandableDetailContainer: React.FC<ExpandableDetailContainerProps> = ({
    initExpanded = false,
    title,
    content,
    onExpandClick,
}) => {
    const tailwind = useTailwind();
    const [expanded, setExpanded] = useState(initExpanded);

    const onExpandClickHandler = useCallback(() => {
        setExpanded(!expanded);
        onExpandClick && onExpandClick(!expanded);
    }, [expanded, onExpandClick]);

    return (
        <Layout level="3" style={[tailwind("my-2 rounded-lg")]}>
            <View style={tailwind("flex-col px-3 py-2")}>
                <TouchableOpacity activeOpacity={1} onPress={onExpandClickHandler}>
                    <View style={tailwind("flex-row justify-between items-center")}>
                        <Text style={tailwind("text-gray-400")}>{title}</Text>
                        <Button
                            style={tailwind("bg-transparent border-0 p-0")}
                            onPress={onExpandClickHandler}
                            accessoryLeft={expanded ? <Icons.ArrowIosDownwardIcon /> : <Icons.ArrowIosForwardIcon />}
                        />
                    </View>
                </TouchableOpacity>
                <Collapsible collapsed={!expanded}>{content}</Collapsible>
            </View>
        </Layout>
    );
};

export { ExpandableDetailContainer, ExpandableDetailContainerProps };
