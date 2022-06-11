import React from "react";
import { ActivityIndicator as AI, ActivityIndicatorProps, Platform } from "react-native";
import Circle from "react-native-progress/Circle";

// Custom ActivityIndicator component.
const ActivityIndicator = (props: ActivityIndicatorProps): React.ReactElement<ActivityIndicatorProps> => {
    if (Platform.OS === "ios") {
        return <AI {...props} />;
    } else {
        return <Circle size={props.size === "small" ? 20 : 36} animated indeterminate={true} color="white" />;
    }
};

export { ActivityIndicator };
