import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Platform } from "react-native";

import { SelectInitialMoviesScreen } from "../../screens/SelectInitialMovies";

type SelectInitialMoviesNavigatorParams = {
    SelectInitialMoviesScreen: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<SelectInitialMoviesNavigatorParams>();

const SelectInitialMoviesNavigator = () => (
    <Navigator
        screenOptions={{
            gestureEnabled: true,
            headerShown: false,
            animation: Platform.OS === "ios" ? "default" : "none" /* Because of Android */,
        }}
        initialRouteName="SelectInitialMoviesScreen">
        <Screen name="SelectInitialMoviesScreen" component={SelectInitialMoviesScreen} />
    </Navigator>
);

export { SelectInitialMoviesNavigator };
export type { SelectInitialMoviesNavigatorParams };
