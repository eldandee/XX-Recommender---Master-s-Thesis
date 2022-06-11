// Formik react native stepform wizard
import { Button, Layout } from "@ui-kitten/components";
import { Formik, FormikProps } from "formik";
import _ from "lodash";
import React, { useState } from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

import { actions } from "../../actions";
import { MovieDto } from "../../api/movies/generated";
import { selectors } from "../../selectors";
import { useAppDispatch, useAppSelector } from "../../utils";
import { Step1Form } from "./Step1";
import { Step2Form } from "./Step2";
import { Step3Form } from "./Step3";

interface InitValuesType {
    rating: number;
    movieId: string;
    movie: MovieDto;
}

interface FormValues {
    ratings: InitValuesType[];
}

// MovieSelectionStepForm is a Formik component that renders a form with three steps.
const MoviesSelectionStepForm: React.FC = () => {
    const [stepNumber, setStepNumber] = useState(0);
    const tailwind = useTailwind();
    const dispatch = useAppDispatch();
    const createRatingsListStatus = useAppSelector(selectors.ratings.getRatings).createRatingsListStatus;

    enum Step {
        Info,
        PickMovies,
        RateMovies,
    }

    const nextStep = (values: FormValues) => {
        if (stepNumber === Step.RateMovies) {
            handleSubmit(values);
        } else {
            setStepNumber(stepNumber + 1);
        }
    };

    const prevStep = () => {
        setStepNumber(Math.max(0, stepNumber - 1));
    };

    const handleSubmit = (values: FormValues) => {
        const moviesWithRatings = values.ratings.filter(({ rating }) => rating !== undefined);
        dispatch(actions.ratings.createUserRatings(moviesWithRatings));
        dispatch(actions.movies.resetMoviesState());
    };

    const getStep = (props: FormikProps<FormValues>, step: number) => {
        switch (step) {
            case Step.Info:
                return <Step1Form {...props} />;
            case Step.PickMovies:
                return <Step2Form {...props} />;
            case Step.RateMovies:
                return <Step3Form {...props} />;
        }
    };

    const lessThenFour = (props: FormikProps<FormValues>) => {
        return _.sumBy(props.values.ratings, ({ rating }) => Number(rating < 4));
    };
    const moreThenFour = (props: FormikProps<FormValues>) => {
        return _.sumBy(props.values.ratings, ({ rating }) => Number(rating >= 4));
    };

    const nextButtonRules = (props: FormikProps<FormValues>) => {
        if (createRatingsListStatus.isSubmiting) {
            return true;
        }
        if (stepNumber === Step.Info) {
            return false;
        } else if (stepNumber === Step.PickMovies && props.values.ratings.length > 9) {
            return false;
        } else if (stepNumber === Step.RateMovies && lessThenFour(props) >= 5 && moreThenFour(props) >= 5) {
            return false;
        }
        return true;
    };

    return (
        <Formik enableReinitialize initialValues={{ ratings: [] }} onSubmit={undefined}>
            {formikProps => (
                <View style={tailwind("flex-1")}>
                    <View style={tailwind("flex-1 items-center justify-center")}>
                        {getStep(formikProps, stepNumber)}
                    </View>
                    <Layout
                        level="1"
                        style={[tailwind("flex-row justify-between px-3"), { paddingBottom: 30, paddingTop: 15 }]}>
                        <View style={{ width: "48%" }}>
                            {stepNumber > Step.Info && (
                                <Button
                                    disabled={createRatingsListStatus.isSubmiting}
                                    size="large"
                                    appearance="outline"
                                    onPress={prevStep}
                                    status="basic">
                                    Back
                                </Button>
                            )}
                        </View>
                        <View style={{ width: "48%" }}>
                            <Button
                                disabled={nextButtonRules(formikProps)}
                                size="large"
                                appearance="outline"
                                onPress={() => nextStep(formikProps.values)}
                                status="primary">
                                {stepNumber === Step.RateMovies ? "Submit" : "Next"}
                            </Button>
                        </View>
                    </Layout>
                </View>
            )}
        </Formik>
    );
};

export { MoviesSelectionStepForm, InitValuesType, FormValues };
