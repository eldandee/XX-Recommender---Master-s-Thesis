import { Icon, Button, IconProps } from "@ui-kitten/components";
import { FormikContextType, FormikProps, useFormikContext } from "formik";
import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { useTailwind } from "tailwind-rn";

import { ActivityIndicator } from "../../../../components/Utility/ActivityIndicator";
import * as Icons from "../../../../components/Utility/Icons";
import { Input } from "../../../../components/Utility/Input";
import { selectors } from "../../../../selectors";
import { theme } from "../../../../tailwind/tailwind.config";
import { useKittenFormikInput } from "../../../../utils/forms";
import { useAppSelector } from "../../../../utils/hooks/reduxHooks";

interface LoginFormValues {
    email?: string;
    password?: string;
}

interface LoginFormProps extends FormikProps<any> {
    onBottomNavigate: () => void;
}
const LoginForm: React.FC<LoginFormProps> = ({ onBottomNavigate }) => {
    const tailwind = useTailwind();
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const auth = useAppSelector(selectors.auth.getAuth);
    const formikContext: FormikContextType<LoginFormValues> = useFormikContext();
    const emailInput = useKittenFormikInput<LoginFormValues>({
        name: "email",
        captionKitten: true,
        statusKitten: true,
    });

    const passwordInput = useKittenFormikInput<LoginFormValues>({
        name: "password",
        captionKitten: true,
        statusKitten: true,
    });
    const onPasswordIconPress = () => {
        setPasswordVisible(!passwordVisible);
    };
    const renderPasswordIcon = (props: IconProps): React.ReactElement => (
        <Pressable onPress={onPasswordIconPress}>
            <Icon {...props} name={!passwordVisible ? "eye-off" : "eye"} />
        </Pressable>
    );
    interface LoginFormValues {
        email: string;
        password: string;
    }
    return (
        <>
            <View style={tailwind("flex-1 mx-4")}>
                <Input {...emailInput} placeholder="Email" accessoryLeft={Icons.EmailOutlineIcon} />
                <Input
                    {...passwordInput}
                    style={tailwind("mt-2 text-white")}
                    placeholder="Password"
                    accessoryLeft={renderPasswordIcon}
                    secureTextEntry={!passwordVisible}
                />
            </View>
            <Button
                style={tailwind("mx-4")}
                size="giant"
                accessoryRight={
                    auth.loginStatus.isSubmiting ? (
                        <ActivityIndicator color={theme["color-primary-500"]} animating size="small" />
                    ) : undefined
                }
                onPress={() => {
                    formikContext.validateForm().then(() => {
                        formikContext.submitForm();
                    });
                }}>
                LOG IN
            </Button>
            <Button style={tailwind("my-3")} appearance="ghost" status="control" onPress={onBottomNavigate}>
                Don't have an account? Sign Up
            </Button>
        </>
    );
};

export { LoginForm, LoginFormProps, LoginFormValues };
