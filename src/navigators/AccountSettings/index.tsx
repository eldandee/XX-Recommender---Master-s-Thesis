import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { AccountSettingsScreen } from "../../screens/AccountSettings";

type AccountSettingsNavigatorParams = {
    AccountSettingsScreen: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<AccountSettingsNavigatorParams>();

const AccountSettingsNavigator = () => (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="AccountSettingsScreen">
        <Screen name="AccountSettingsScreen" component={AccountSettingsScreen} />
    </Navigator>
);

export { AccountSettingsNavigator };
export type { AccountSettingsNavigatorParams };
