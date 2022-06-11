import { Layout, Text, Icon } from "@ui-kitten/components";
import { FormikProps } from "formik";
import React from "react";
import { useTailwind } from "tailwind-rn/dist";

type Step1Props = FormikProps<any>;

const Step1Form: React.FC<Step1Props> = () => {
    const tailwind = useTailwind();
    return (
        <>
            <Icon name="info" style={tailwind("w-28 h-28")} fill="white" />
            <Layout level="2" style={tailwind("p-3")}>
                <Text category="h5">For better understanding of your taste we need little bit of info</Text>
                <Text style={tailwind("mt-2")}>
                    <Text style={tailwind("text-lg")}>Select at least 10 movies and 5 of them rate </Text>
                    <Text status="danger" style={tailwind("text-lg")}>
                        0.5-3.5
                    </Text>
                    <Text style={tailwind("text-lg")}> and 5 of them </Text>
                    <Text status="success" style={tailwind("text-lg")}>
                        4-5
                    </Text>
                </Text>
                <Text category="p1" style={tailwind("mt-4 text-lg")}>
                    More you rate, better recommendations you will get!!!
                </Text>
            </Layout>
        </>
    );
};

export { Step1Form, Step1Props };
