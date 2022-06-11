import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { RecommendedMoviesScreen } from "../../screens/RecommendedMovies";

type RecommendedMoviesNavigatorParams = {
    RecommendedMoviesScreen: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<RecommendedMoviesNavigatorParams>();

const RecommendedMoviesNavigator = () => (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="RecommendedMoviesScreen">
        <Screen name="RecommendedMoviesScreen" component={RecommendedMoviesScreen} />
    </Navigator>
);

export { RecommendedMoviesNavigator };
export type { RecommendedMoviesNavigatorParams };
