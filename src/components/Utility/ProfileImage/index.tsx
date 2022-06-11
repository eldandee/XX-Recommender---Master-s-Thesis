import React from "react";
import { ImageProps, ImageStyle } from "react-native";
import Image from "react-native-image-progress";
import { useTailwind } from "tailwind-rn/dist";

import { ActivityIndicator } from "../ActivityIndicator";

const ProfileImageSizes: Record<string, Pick<ImageStyle, "width" | "height">> = {
    small: {
        width: 61,
        height: 61,
    },
    large: {
        width: 72,
        height: 108,
    },
};

interface ProfileImageProps extends ImageProps {
    size?: "small" | "large";
}

// ProfileImage component with loading indicator
const ProfileImage: React.FC<ProfileImageProps> = ({ size = "large", ...viewProps }) => {
    const tailwind = useTailwind();
    return (
        <Image
            {...viewProps}
            indicator={props => <ActivityIndicator {...props} color="white" size="small" />}
            resizeMethod="auto"
            imageStyle={[tailwind("rounded-full"), ProfileImageSizes[size]]}
            indicatorProps={{
                size: 30,
                borderWidth: 0,
            }}
            style={[tailwind("rounded-full"), ProfileImageSizes[size]]}
        />
    );
};

export { ProfileImage, ProfileImageProps, ProfileImageSizes };
