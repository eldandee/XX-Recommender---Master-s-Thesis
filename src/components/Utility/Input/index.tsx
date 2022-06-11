import { Icon, IconProps, Input as UIKittenInput, InputProps } from "@ui-kitten/components";
import React, { useState, useRef } from "react";
import { Pressable } from "react-native";

// Custom input with icon on the right side
const Input: React.FC<InputProps> = ({ ...inputProps }) => {
    const ref = useRef<UIKittenInput>(null);
    const [text, setText] = useState("");

    const rightIcon = (iconProps: IconProps): React.ReactElement => (
        <Pressable
            onPress={() => {
                inputProps.onChangeText("");
                setText("");
                ref.current.clear();
            }}>
            <Icon {...iconProps} name={"close-outline"} />
        </Pressable>
    );

    return (
        <UIKittenInput
            {...inputProps}
            ref={ref}
            onChangeText={value => {
                setText(value);
                inputProps.onChangeText?.(value);
            }}
            accessoryRight={text.length && rightIcon}
        />
    );
};

export { Input };
