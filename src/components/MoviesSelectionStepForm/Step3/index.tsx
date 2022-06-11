import { Layout, Text, TopNavigation } from "@ui-kitten/components";
import { FormikContextType, FormikProps, useFormikContext } from "formik";
import _ from "lodash";
import React, { useMemo } from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

import { FormValues, InitValuesType } from "../";
import { MoviesList } from "./MoviesList";

type Step3Props = FormikProps<any>;

const Step3Form: React.FC<Step3Props> = () => {
    const tailwind = useTailwind();
    const formikContext: FormikContextType<FormValues> = useFormikContext();

    const lessThenFour = useMemo(
        () => _.sumBy(formikContext.values.ratings, ({ rating }) => rating !== undefined && Number(rating < 4)),
        [formikContext.values.ratings],
    );
    const moreThenFour = useMemo(
        () => _.sumBy(formikContext.values.ratings, ({ rating }) => Number(rating >= 4)),
        [formikContext.values.ratings],
    );

    return (
        <View style={tailwind("flex-1 w-full")}>
            <TopNavigation
                alignment="center"
                title={_props => <Text style={tailwind("text-xl text-[#808081]")}>Rated movies</Text>}
            />
            <Layout level="1" style={tailwind(" items-center p-4")}>
                <View style={tailwind("justify-between flex-row w-2/5")}>
                    <Text style={tailwind("text-xl")} status="danger">
                        {lessThenFour}
                    </Text>
                    <Text style={tailwind("text-xl")} status="success">
                        {moreThenFour}
                    </Text>
                </View>
            </Layout>
            <MoviesList
                style={tailwind("flex-1")}
                onMovieRemove={(movie: Partial<InitValuesType>) => {
                    formikContext.setFieldValue("ratings", [
                        ...formikContext.values.ratings.filter(m => m.movieId !== movie?.movieId),
                    ]);
                }}
                data={formikContext.values.ratings}
                onMovieRate={(movie: Partial<InitValuesType>, rating: number) => {
                    formikContext.setFieldValue("ratings", [
                        ...formikContext.values.ratings.map(m =>
                            m.movieId === movie.movieId ? { ...movie, rating } : m,
                        ),
                    ]);
                }}
            />
        </View>
    );
};

export { Step3Form, Step3Props };
