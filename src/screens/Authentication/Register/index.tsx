import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text } from "@ui-kitten/components";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { useTailwind } from "tailwind-rn";
import * as yup from "yup";

import { actions } from "../../../actions";
import { AuthNavigatorParams } from "../../../navigators/Auth";
import { selectors } from "../../../selectors";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks/reduxHooks";
import { ImageOverlay } from "../ImageOverlay";
import { KeyboardAvoidingView } from "../KeyboardAvoidingView";
// redux
import { RegisterFormValues, RegisterForm } from "./RegisterForm";

/**
 * Used image is FREE TO USE from https://www.pexels.com/cs-cz/license/
 * URL: https://www.pexels.com/cs-cz/foto/fotoaparat-fotografie-technologie-objektiv-2873486/
 * Author: Bruno Massao
 */

/**
 * Layout and some code is inspired by code from UI Kitten Library and its example projects
 * URL: https://github.com/akveo/kittenTricks
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 akveo.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * **/
// tslint:disable-next-line:no-empty-interface
interface RegisterScreenProps {}

const RegisterScreen: React.FC<RegisterScreenProps> = ({}) => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector(selectors.auth.getAuth);
    const navigation = useNavigation<NativeStackNavigationProp<AuthNavigatorParams>>();
    useEffect(() => {
        if (auth?.registerStatus?.data?.status) {
            Toast.show({
                type: "success",
                text2: auth.registerStatus?.data?.message || "",
            });
            dispatch(actions.auth.clearRegisterStatus());
            navigation.navigate("LoginScreen");
        }
    }, [auth.registerStatus?.data?.status]);

    const tailwind = useTailwind();

    const schema: yup.AnyObjectSchema = yup.object({
        username: yup.string().required("Required."),
        email: yup.string().email("Invalid email").required("Required."),
        password: yup
            .string()
            .required("Required.")
            .min(8, "Password is too short - should be 8 chars minimum.")
            .nullable(),
        passwordConfirm: yup
            .string()
            .required("Required.")
            .oneOf([yup.ref("password"), null], "Passwords must match."),
    });

    return (
        <KeyboardAvoidingView>
            <ImageOverlay style={tailwind("flex-1")} source={require("../../../assets/images/auth-background.jpg")}>
                <View style={[tailwind("justify-center items-center"), { minHeight: 216 }]}>
                    <Text category="h2" status="control">
                        Sign Up
                    </Text>
                    <Text style={tailwind("mt-4")} category="s1" status="control">
                        And get awesome movie recommendations!
                    </Text>
                </View>
                <Formik
                    initialValues={{
                        username: "",
                        email: "",
                        password: "",
                    }}
                    validateOnBlur={false}
                    validateOnChange={false}
                    validationSchema={schema}
                    onSubmit={(values: RegisterFormValues) =>
                        dispatch(actions.auth.register(values?.username, values?.email, values?.password))
                    }>
                    {props => (
                        <RegisterForm
                            {...props}
                            onBottomNavigate={() => {
                                navigation.navigate("LoginScreen");
                            }}
                        />
                    )}
                </Formik>
            </ImageOverlay>
        </KeyboardAvoidingView>
    );
};

export { RegisterScreen, RegisterScreenProps };
