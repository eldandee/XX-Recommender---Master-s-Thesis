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

interface RegisterFormValues {
    username?: string;
    email?: string;
    password?: string;
}

interface RegisterFormProps extends FormikProps<any> {
    onSubmit?: (values?: RegisterFormValues) => void;
    onBottomNavigate: () => void;
}
const RegisterForm: React.FC<RegisterFormProps> = ({ onBottomNavigate }) => {
    const tailwind = useTailwind();
    const auth = useAppSelector(selectors.auth.getAuth);
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [passwordConfirmVisible, setPasswordConfirmVisible] = useState<boolean>(false);
    const formikContext: FormikContextType<RegisterFormValues> = useFormikContext();
    const usernameInput = useKittenFormikInput<RegisterFormValues>({
        name: "username",
        captionKitten: true,
        statusKitten: true,
    });
    const emailInput = useKittenFormikInput<RegisterFormValues>({
        name: "email",
        captionKitten: true,
        statusKitten: true,
    });

    const passwordInput = useKittenFormikInput<RegisterFormValues>({
        name: "password",
        captionKitten: true,
        statusKitten: true,
    });

    const passwordConfirmInput = useKittenFormikInput<RegisterFormValues>({
        name: "passwordConfirm",
        captionKitten: true,
        statusKitten: true,
    });

    const renderPasswordIcon = (
        props: IconProps,
        passwordIconState: boolean,
        onPressAction: React.Dispatch<React.SetStateAction<boolean>>,
    ): React.ReactElement => (
        <Pressable onPress={() => onPressAction(!passwordIconState)}>
            <Icon {...props} name={!passwordIconState ? "eye-off" : "eye"} />
        </Pressable>
    );
    return (
        <>
            <View style={tailwind("flex-1 mx-4")}>
                <Input {...usernameInput} placeholder="Username" accessoryLeft={Icons.AccountIcon} />
                <Input
                    {...emailInput}
                    style={tailwind("mt-2")}
                    placeholder="Email"
                    accessoryLeft={Icons.EmailOutlineIcon}
                />
                <Input
                    {...passwordInput}
                    style={tailwind("mt-2")}
                    placeholder="Password"
                    accessoryLeft={props => renderPasswordIcon(props, passwordVisible, setPasswordVisible)}
                    secureTextEntry={!passwordVisible}
                />
                <Input
                    {...passwordConfirmInput}
                    style={tailwind("mt-2")}
                    placeholder="Confirm Password"
                    accessoryLeft={props =>
                        renderPasswordIcon(props, passwordConfirmVisible, setPasswordConfirmVisible)
                    }
                    secureTextEntry={!passwordConfirmVisible}
                />
            </View>
            <Button
                style={tailwind("mx-4")}
                size="giant"
                accessoryRight={
                    auth.registerStatus.isFetching ? (
                        <ActivityIndicator color={theme["color-primary-500"]} animating size="small" />
                    ) : undefined
                }
                onPress={() => {
                    formikContext.validateForm().then(() => {
                        formikContext?.submitForm();
                    });
                }}>
                SIGN UP
            </Button>
            <Button style={tailwind("my-3")} appearance="ghost" status="control" onPress={onBottomNavigate}>
                Already have account? Log In
            </Button>
        </>
    );
};

export { RegisterForm, RegisterFormProps, RegisterFormValues };
