import { Text, Layout } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

interface SimpleDetailContainerProps {
    title: string;
    content?: JSX.Element;
    extra?: JSX.Element;
}

const SimpleDetailContainer: React.FC<SimpleDetailContainerProps> = ({ title, content, extra }) => {
    const tailwind = useTailwind();
    return (
        <Layout level="3" style={[tailwind("my-2 rounded-lg")]}>
            <View style={tailwind("flex-col px-3 py-2")}>
                <View style={tailwind("flex-row justify-between items-center")}>
                    <Text style={tailwind("text-gray-400")}>{title}</Text>
                    {extra}
                </View>
                {content}
            </View>
        </Layout>
    );
};

export { SimpleDetailContainer, SimpleDetailContainerProps };
