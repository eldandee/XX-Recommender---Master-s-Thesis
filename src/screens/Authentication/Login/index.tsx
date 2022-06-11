import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text } from "@ui-kitten/components";
import { Formik } from "formik";
import React from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn";
import * as yup from "yup";

import { actions } from "../../../actions";
import { AuthNavigatorParams } from "../../../navigators/Auth";
import { useAppDispatch } from "../../../utils/hooks/reduxHooks";
import { ImageOverlay } from "../ImageOverlay";
import { KeyboardAvoidingView } from "../KeyboardAvoidingView";
import { LoginFormValues, LoginForm } from "./LoginForm";

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
interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = ({}) => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<AuthNavigatorParams>>();
    const tailwind = useTailwind();

    const schema: yup.AnyObjectSchema = yup.object({
        email: yup.string().email("Invalid email").required("Required."),
        password: yup
            .string()
            .required("Required.")
            .min(8, "Password is too short - should be 8 chars minimum.")
            .nullable(),
    });

    return (
        <KeyboardAvoidingView>
            <ImageOverlay style={tailwind("flex-1")} source={require("../../../assets/images/auth-background.jpg")}>
                <View style={[tailwind("justify-center items-center"), { minHeight: 216 }]}>
                    <Text category="h2" status="control">
                        Hello
                    </Text>
                    <Text style={tailwind("mt-4")} category="s1" status="control">
                        Log In to your account
                    </Text>
                </View>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validateOnBlur={false}
                    validateOnChange={false}
                    validationSchema={schema}
                    onSubmit={(values: LoginFormValues) =>
                        dispatch(actions.auth.login(values?.email, values?.password))
                    }>
                    {props => (
                        <LoginForm
                            {...props}
                            onBottomNavigate={() => {
                                navigation.navigate("RegisterScreen");
                            }}
                        />
                    )}
                </Formik>
            </ImageOverlay>
        </KeyboardAvoidingView>
    );
};

export { LoginScreen, LoginScreenProps };
