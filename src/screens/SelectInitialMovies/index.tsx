import { Layout } from "@ui-kitten/components";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";

import { MoviesSelectionStepForm } from "../../components/MoviesSelectionStepForm";
import { SafeAreaLayout } from "../../components/Utility/SafeArea";

const SelectInitialMoviesScreen = () => {
    const tailwind = useTailwind();

    return (
        <SafeAreaLayout style={tailwind("flex-1")} insets="top">
            <Layout level="2" style={tailwind("flex-1")}>
                <MoviesSelectionStepForm />
            </Layout>
        </SafeAreaLayout>
    );
};

export { SelectInitialMoviesScreen };
