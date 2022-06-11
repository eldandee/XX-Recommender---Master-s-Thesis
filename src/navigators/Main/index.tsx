import { NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";

import { actions } from "../../actions";
import { selectors } from "../../selectors";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/reduxHooks";
import { MovieDetailNavigator, MovieDetailNavigatorParams } from "../MovieDetail";
import { RecommenderBottomNavigator, RecommenderBottomNavigatorParams } from "../RecommenderBottom";

// it is called main navigator because it contains screen that will be used mainly in the app
type MainNavigatorParams = {
    RecommenderBottomNavigator: RecommenderBottomNavigatorParams;
    MovieDetailNavigation: NavigatorScreenParams<MovieDetailNavigatorParams>;
};
const { Navigator, Screen } = createNativeStackNavigator<MainNavigatorParams>();

const MainNavigator = () => {
    const dispatch = useAppDispatch();
    const errorHandling = useAppSelector(selectors.apiErrorHandling.getApiErrorHandling);

    useEffect(() => {
        if (errorHandling?.error) {
            Toast.show({
                type: "error",
                text2: errorHandling?.errorResponse?.message || "Connection error",
            });
            dispatch(actions.apiErrorHandling.resetApiCallErrorState());
        }
    }, [errorHandling?.error]);

    return (
        <Navigator
            initialRouteName="RecommenderBottomNavigator"
            screenOptions={{
                gestureEnabled: true,
                headerShown: false,
                animation: Platform.OS === "ios" ? "default" : "none" /* Because of Android */,
            }}>
            <Screen name="RecommenderBottomNavigator" component={RecommenderBottomNavigator} />
            <Screen name="MovieDetailNavigation" component={MovieDetailNavigator} />
        </Navigator>
    );
};

export { MainNavigator };
export type { MainNavigatorParams };
