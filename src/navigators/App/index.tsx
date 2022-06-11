import { NavigationContainer, DefaultTheme, Theme } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import React, { useEffect } from "react";
import Toast from "react-native-toast-message";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import { actions } from "../../actions";
import { Loading } from "../../components/Utility/Loading";
import { toastConfig } from "../../components/Utility/Toasts";
import { selectors } from "../../selectors";
import { cacheImages } from "../../utils";
import { getSecureKey } from "../../utils/helpers/secureStorage";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/reduxHooks";
import { AuthNavigator } from "../Auth";
import { MainNavigator } from "../Main";
import { SelectInitialMoviesNavigator } from "../SelectInitialMovies";

const App = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector(selectors.auth.getAuth);
    const appState = useAppSelector(selectors.app.getAppState);
    const ratings = useAppSelector(selectors.ratings.getRatings);

    const fetchAccessToken = async () => {
        const refreshToken: string = await getSecureKey("refreshToken");
        if (refreshToken) {
            dispatch(actions.auth.refreshAccessTokenFirstInit(refreshToken));
        } else {
            dispatch(actions.auth.setUserIsFetching(false));
            dispatch(actions.ratings.setUserInfoIsFetching(false));
        }
    };

    const loadAssetsAsync = async () => {
        const imageAssets = cacheImages([require("../../assets/images/auth-background.jpg")]);
        await Promise.all([
            ...imageAssets,
            Font.loadAsync({
                ...MaterialCommunityIcons?.font,
                ...MaterialIcons?.font,
            }),
        ]);
    };

    const renderContent = () => {
        if (auth?.user?.fetched && appState.ready && ratings?.userRatingsInfo?.data?.numberOfRatings >= 10) {
            return <MainNavigator />;
        } else if (auth?.user?.fetched && appState.ready && ratings?.userRatingsInfo?.data?.numberOfRatings < 10) {
            return <SelectInitialMoviesNavigator />;
        } else if (appState.ready && (auth?.user?.isFetching || ratings?.userRatingsInfo.isFetching)) {
            return <Loading />;
        } else {
            return <AuthNavigator />;
        }
    };

    const NavigatorTheme: Theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            // background to prevent white flash - now it's #1F1E3D. It is background of the whole app from theme.json in config
            // white flash is bug of current version of @react-navigation/native but maybe fixed in next version
            background: "#1F1E3D",
        },
    };

    useEffect(() => {
        if (auth?.user?.fetched && appState.ready) {
            dispatch(actions.ratings.fetchUserInfo());
        }
    }, [auth.user.fetched]);

    if (!appState.ready) {
        return (
            <AppLoading
                startAsync={loadAssetsAsync}
                onFinish={() => {
                    dispatch(actions.app.setAppReadyState(true));
                    fetchAccessToken();
                }}
                onError={console.warn}
            />
        );
    }

    return (
        <>
            <NavigationContainer theme={NavigatorTheme}>{renderContent()}</NavigationContainer>
            <Toast config={toastConfig} />
        </>
    );
};

export { App };
