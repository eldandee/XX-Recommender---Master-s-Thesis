import { Text, TextProps } from "@ui-kitten/components";
import React from "react";
interface RuntimeProps extends TextProps {
    runtime: number;
}
// Runtime component
const Runtime: React.FC<RuntimeProps> = ({ runtime, ...props }): React.ReactElement<TextProps> => {
    const formatRuntime = (runtime: number): string => {
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return `${hours}h ${minutes}m`;
    };

    return <Text {...props}>{formatRuntime(runtime)}</Text>;
};

export { Runtime, RuntimeProps };
