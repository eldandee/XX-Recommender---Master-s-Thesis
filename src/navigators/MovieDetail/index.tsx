import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { MovieDetailScreen } from "../../screens/MovieDetail";

type MovieDetailNavigatorParams = {
    MovieDetailScreen: {
        movieId: string;
    };
};

const { Navigator, Screen } = createNativeStackNavigator<MovieDetailNavigatorParams>();

const MovieDetailNavigator = () => (
    <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="MovieDetailScreen" component={MovieDetailScreen} />
    </Navigator>
);

export { MovieDetailNavigator };
export type { MovieDetailNavigatorParams };
