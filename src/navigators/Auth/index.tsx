import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";

import { actions } from "../../actions";
import { LoginScreen } from "../../screens/Authentication/Login";
import { RegisterScreen } from "../../screens/Authentication/Register";
import { selectors } from "../../selectors";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/reduxHooks";

type AuthNavigatorParams = {
    LoginScreen: undefined;
    RegisterScreen: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<AuthNavigatorParams>();

const AuthNavigator = () => {
    const dispatch = useAppDispatch();
    const errorHandling = useAppSelector(selectors.apiErrorHandling.getApiErrorHandling);

    useEffect(() => {
        if (errorHandling?.error && errorHandling?.errorResponse) {
            Toast.show({
                type: "error",
                text2: errorHandling?.errorResponse?.message || "Connection error",
            });
            dispatch(actions.apiErrorHandling.resetApiCallErrorState());
        }
    }, [errorHandling?.error]);

    return (
        <Navigator
            screenOptions={{
                gestureEnabled: true,
                headerShown: false,
                animation: Platform.OS === "ios" ? "default" : "none" /* Because of Android */,
            }}>
            <Screen name="LoginScreen" component={LoginScreen} />
            <Screen name="RegisterScreen" component={RegisterScreen} />
        </Navigator>
    );
};

export { AuthNavigator };
export type { AuthNavigatorParams };
