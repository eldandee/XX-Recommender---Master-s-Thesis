import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { SearchMoviesScreen } from "../../screens/SearchMovies";

type SearchMoviesNavigatorParams = {
    SearchMoviesScreen: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<SearchMoviesNavigatorParams>();

const SearchMoviesNavigator = () => (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="SearchMoviesScreen">
        <Screen name="SearchMoviesScreen" component={SearchMoviesScreen} />
    </Navigator>
);

export { SearchMoviesNavigator };
export type { SearchMoviesNavigatorParams };
