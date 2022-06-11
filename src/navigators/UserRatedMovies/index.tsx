import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { UserRatedScreen } from "../../screens/UserRatedMovies";

type UserRatedNavigatorParams = {
    UserRatedScreen: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<UserRatedNavigatorParams>();

const UserRatedNavigator = () => (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="UserRatedScreen">
        <Screen name="UserRatedScreen" component={UserRatedScreen} />
    </Navigator>
);

export { UserRatedNavigator };
export type { UserRatedNavigatorParams };
