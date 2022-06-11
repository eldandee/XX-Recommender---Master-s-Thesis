import React from "react";
import { ImageProps, ImageStyle } from "react-native";
import Image from "react-native-image-progress";
import { useTailwind } from "tailwind-rn/dist";

import { ActivityIndicator } from "../ActivityIndicator";

const PosterSizes: Record<string, Pick<ImageStyle, "width" | "height">> = {
    small: {
        width: 54,
        height: 81,
    },
    large: {
        width: 72,
        height: 108,
    },
};

interface PosterProps extends ImageProps {
    size?: "small" | "large";
}

// Poster component with loading indicator
const Poster: React.FC<PosterProps> = ({ size = "large", ...viewProps }) => {
    const tailwind = useTailwind();
    return (
        <Image
            {...viewProps}
            indicator={props => <ActivityIndicator {...props} color="white" size="small" />}
            imageStyle={[tailwind("rounded-xl"), PosterSizes[size]]}
            indicatorProps={{
                size: 30,
                borderWidth: 0,
            }}
            style={[tailwind("rounded-xl"), PosterSizes[size]]}
        />
    );
};

export { Poster, PosterProps, PosterSizes };
