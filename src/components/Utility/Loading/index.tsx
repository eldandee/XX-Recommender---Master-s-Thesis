import { Layout } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn";

import { theme } from "../../../tailwind/tailwind.config";
import { ActivityIndicator } from "../ActivityIndicator";

const Loading: React.FC = () => {
    const tailwind = useTailwind();
    return (
        <Layout level="2" style={tailwind("flex-1 items-center justify-center")}>
            <View style={tailwind("flex-col items-center")}>
                <ActivityIndicator color={theme["color-primary-500"]} animating size="large" />
            </View>
        </Layout>
    );
};

export { Loading };
