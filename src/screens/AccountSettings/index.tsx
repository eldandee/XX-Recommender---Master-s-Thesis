import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Layout, Text, Icon, TopNavigation, Button } from "@ui-kitten/components";
import React, { useCallback, useRef } from "react";
import { View, Platform } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

import { actions } from "../../actions";
import TMDBLogo from "../../assets/images/tmdb-logo.svg";
import { ActivityIndicator } from "../../components/Utility/ActivityIndicator";
import { MovieBottomSheet } from "../../components/Utility/BottomSheet";
import * as Icons from "../../components/Utility/Icons";
import { SafeAreaLayout } from "../../components/Utility/SafeArea";
import { selectors } from "../../selectors";
import { theme } from "../../tailwind/tailwind.config";
import { useAppDispatch, useAppSelector } from "../../utils";

/**
 * There is a attribution for TMDB API based on terms:
 * https://www.themoviedb.org/documentation/api/terms-of-use
 */
const AccountSettingsScreen = () => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const dispatch = useAppDispatch();
    const auth = useAppSelector(selectors.auth.getAuth);
    const ratings = useAppSelector(selectors.ratings.getRatings);
    const tailwind = useTailwind();

    const handlePresentModalPress = useCallback(() => {
        bottomSheetRef.current?.present();
    }, []);

    const handleDeleteAllRatings = useCallback(() => {
        bottomSheetRef.current?.close();
        dispatch(actions.ratings.deleteAllUserRatings());
    }, []);

    const handleLogout = useCallback(() => {
        bottomSheetRef.current?.close();
        dispatch(actions.auth.logout(auth.accessToken));
    }, []);

    return (
        <SafeAreaLayout style={tailwind("flex-1")} insets="top">
            <TopNavigation alignment="center" title="Account" />
            <Layout level="2" style={tailwind("flex-1")}>
                <Layout level="1" style={tailwind("flex-row p-4 items-center")}>
                    <Icon fill="white" style={{ width: 60, height: 60 }} name="person" />
                    <View style={tailwind("flex-1 flex-row flex-wrap ml-3")}>
                        <Text style={tailwind("font-bold")}>{auth.user.data.username}</Text>
                    </View>
                </Layout>
                <Layout level="2" style={tailwind("flex-1 justify-between")}>
                    <Button
                        style={tailwind("mx-4 my-3")}
                        size="medium"
                        status="danger"
                        appearance="outline"
                        accessoryLeft={Icons.TrashIcon}
                        onPress={handlePresentModalPress}>
                        Delete all ratings
                    </Button>
                    <View>
                        <View style={tailwind("mx-4 my-3")}>
                            <TMDBLogo width={35} height={17} style={tailwind("my-1")} />
                            <Text category="c2" style={tailwind("text-gray-400")}>
                                This product uses the TMDB API but is not endorsed or certified by TMDB.
                            </Text>
                        </View>
                        <Button
                            style={tailwind("mx-4 my-3")}
                            size="medium"
                            appearance="outline"
                            accessoryRight={
                                auth.logoutStatus.isSubmiting ? (
                                    <ActivityIndicator color={theme["color-primary-500"]} animating size="small" />
                                ) : undefined
                            }
                            onPress={handleLogout}>
                            Log Out
                        </Button>
                    </View>
                </Layout>
            </Layout>
            <MovieBottomSheet
                innerRef={bottomSheetRef}
                snapPoint={Platform.OS === "android" ? "25%" : "20%"}
                content={
                    <BottomSheetView>
                        <View style={tailwind("flex-col m-4 p-2")}>
                            <Button
                                size="medium"
                                appearance="ghost"
                                status="danger"
                                accessoryLeft={Icons.TrashIcon}
                                accessoryRight={
                                    ratings.deletedAllRatingsStatus.isSubmiting ? (
                                        <ActivityIndicator color={theme["color-primary-500"]} animating size="small" />
                                    ) : undefined
                                }
                                onPress={handleDeleteAllRatings}>
                                Delete all ratings
                            </Button>
                            <Button
                                appearance="outline"
                                style={tailwind("my-2")}
                                size="medium"
                                onPress={() => bottomSheetRef.current?.close()}>
                                Cancel
                            </Button>
                        </View>
                    </BottomSheetView>
                }
            />
        </SafeAreaLayout>
    );
};

export { AccountSettingsScreen };
