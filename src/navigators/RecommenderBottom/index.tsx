import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import * as Icons from "../../components/Utility/Icons";
import { AccountSettingsNavigator, AccountSettingsNavigatorParams } from "../AccountSettings";
import { RecommendedMoviesNavigator, RecommendedMoviesNavigatorParams } from "../RecommendedMovies";
import { SearchMoviesNavigator, SearchMoviesNavigatorParams } from "../SearchMovies";
import { UserRatedNavigator, UserRatedNavigatorParams } from "../UserRatedMovies";

const BottomTabBar = ({ navigation, state }) => {
    const insetsConfig = useSafeAreaInsets();
    return (
        <BottomNavigation
            appearance="noIndicator"
            style={{ paddingBottom: insetsConfig.bottom, paddingTop: 16 }}
            selectedIndex={state.index}
            onSelect={index => navigation.navigate(state.routeNames[index])}>
            <BottomNavigationTab icon={Icons.MovieIcon} />
            <BottomNavigationTab icon={Icons.SearchIcon} />
            <BottomNavigationTab icon={Icons.StarIconM} />
            <BottomNavigationTab icon={Icons.AccountIcon} />
        </BottomNavigation>
    );
};

type RecommenderBottomNavigatorParams = {
    RecommendedMoviesNavigator: RecommendedMoviesNavigatorParams;
    SearchNavigator: SearchMoviesNavigatorParams;
    UserRatedMoviesNavigator: UserRatedNavigatorParams;
    AccountSettingsNavigator: AccountSettingsNavigatorParams;
};

const { Navigator, Screen } = createBottomTabNavigator<RecommenderBottomNavigatorParams>();

const RecommenderBottomNavigator = () => (
    <Navigator
        safeAreaInsets={{ bottom: 0 }}
        screenOptions={{ headerShown: false }}
        initialRouteName="RecommendedMoviesNavigator"
        tabBar={props => <BottomTabBar {...props} />}>
        <Screen name="RecommendedMoviesNavigator" component={RecommendedMoviesNavigator} />
        <Screen name="SearchNavigator" component={SearchMoviesNavigator} />
        <Screen name="UserRatedMoviesNavigator" component={UserRatedNavigator} />
        <Screen name="AccountSettingsNavigator" component={AccountSettingsNavigator} />
    </Navigator>
);

export { RecommenderBottomNavigator };
export type { RecommenderBottomNavigatorParams };
