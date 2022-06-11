import { InputProps } from "@ui-kitten/components";
import { FormikContextType, useFormikContext } from "formik";

interface FormInputProps extends InputProps {
    name: string;
    statusKitten?: boolean;
    captionKitten?: boolean;
}

const useKittenFormikInput = <T>(props: FormInputProps): InputProps => {
    const formikContext: FormikContextType<T> = useFormikContext();
    if (!formikContext) {
        return {
            ...props,
        };
    }
    const { values, errors, setFieldValue } = formikContext;
    return {
        value: values[props.name],
        caption:
            (props.captionKitten &&
                (values[props.name] || errors[props.name] === "Required.") &&
                errors[props.name]?.trim().length &&
                errors[props.name]) ||
            props.caption ||
            " ",
        status:
            (props.statusKitten &&
                errors[props.name] &&
                (values[props.name] || errors[props.name] === "Required.") &&
                "danger") ||
            props.status ||
            "control",
        onChangeText: (value?: string) => {
            props.onChangeText?.(value);
            setFieldValue(props.name, value ?? null);
        },
    };
};

export { useKittenFormikInput, FormInputProps };
