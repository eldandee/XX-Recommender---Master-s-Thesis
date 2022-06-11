import * as eva from "@eva-design/eva";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { TailwindProvider } from "tailwind-rn";

import "react-native-url-polyfill/auto";
import { setupInterceptors } from "./src/api/auth/setupInterceptors";
import { default as mapping } from "./src/config/mapping.json";
import { default as theme } from "./src/config/theme.json";
import { App as AppNavigator } from "./src/navigators/App";
import { store } from "./src/store/configureStore";
import utilities from "./src/tailwind/tailwind.json";
import { MaterialIconsPack } from "./src/utils/icon-packs/material";
import "react-native-gesture-handler";

const App = () => {
    setupInterceptors(); // setup interceptors for api calls

    return (
        <Provider store={store}>
            <TailwindProvider utilities={utilities}>
                <IconRegistry icons={[EvaIconsPack, MaterialIconsPack]} />
                <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }} customMapping={mapping}>
                    <BottomSheetModalProvider>
                        <SafeAreaProvider>
                            <AppNavigator />
                        </SafeAreaProvider>
                    </BottomSheetModalProvider>
                </ApplicationProvider>
            </TailwindProvider>
        </Provider>
    );
};

export default App;
