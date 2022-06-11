import { Icon, IconProps, Input, InputProps } from "@ui-kitten/components";
import debounce from "lodash.debounce";
import React, { useMemo, useState, useRef, useEffect } from "react";
import { Pressable } from "react-native";

interface SearchInputProps extends InputProps {
    onSearch: (text: string) => void;
    value: string;
}

// Custom search input component with debounce for lists of movies
const SearchInput: React.FC<SearchInputProps> = ({ onSearch, value, ...props }) => {
    const ref = useRef<Input>(null);
    const [text, setText] = useState(value);

    useEffect(() => {
        // cleanup because of warning
        return () => {
            setText("");
        };
    }, []);
    const searchHandler = (value: string) => {
        onSearch(value);
        setText(value);
    };
    const debouncedChangeHandler = useMemo(() => debounce(searchHandler, 1550), []);

    const renderPasswordIcon = (props: IconProps): React.ReactElement => (
        <Pressable
            onPress={() => {
                searchHandler("");
                setText("");
                ref.current.clear();
            }}>
            <Icon {...props} name={"close-outline"} />
        </Pressable>
    );

    // Placeholder Icon only for easier centering
    const placeholderIcon = (props: IconProps): React.ReactElement => (
        <Icon {...props} fill="transparent" name={"close-outline"} />
    );

    return (
        <Input
            {...props}
            ref={ref}
            autoCorrect={false}
            value={text}
            status="basic"
            onChangeText={(text: string) => {
                setText(text);
                debouncedChangeHandler(text);
            }}
            accessoryRight={text.length ? renderPasswordIcon : placeholderIcon}
        />
    );
};

export { SearchInput, SearchInputProps };
