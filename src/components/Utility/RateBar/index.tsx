import React from "react";
import { View, ViewProps } from "react-native";
import Stars from "react-native-stars";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTailwind } from "tailwind-rn";

const RateBarSize = {
    small: 15,
    large: 35,
};

interface RateBarProps extends ViewProps {
    size: "small" | "large";
    value: number;
    onValueChange?: (value: number) => void;
    mode: "selection" | "display";
}

// RateBar component using react-native-stars package
const RateBar: React.FC<RateBarProps> = ({
    onValueChange,
    value,
    size,
    mode,
    ...viewProps
}): React.ReactElement<ViewProps> => {
    const tailwind = useTailwind();
    const starSize = { fontSize: RateBarSize[size] };

    return (
        <View {...viewProps} style={tailwind("flex-row items-center")}>
            <Stars
                count={5}
                display={mode === "display" ? value : undefined}
                default={mode === "selection" ? value : undefined}
                half={true}
                starSize={40}
                update={val => onValueChange(val)}
                fullStar={<Icon name="star" style={[tailwind("text-[#FFA800] bg-transparent"), starSize]} />}
                emptyStar={<Icon name="star-outline" style={[tailwind("text-white bg-transparent"), starSize]} />}
                halfStar={<Icon name="star-half-full" style={[tailwind("text-[#FFA800] bg-transparent"), starSize]} />}
            />
        </View>
    );
};

export { RateBar, RateBarSize, RateBarProps };
