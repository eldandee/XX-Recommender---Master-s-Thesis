import React from "react";
import { ImageBackground, ImageBackgroundProps, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
/**
 * Code from UI Kitten Library and its example projects
 * URL: https://github.com/akveo/kittenTricks
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 akveo.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * **/
interface OverlayImageStyle extends ViewStyle {
    overlayColor?: string;
}

interface ImageOverlayProps extends ImageBackgroundProps {
    style?: StyleProp<OverlayImageStyle>;
    children?: React.ReactNode;
}

const DEFAULT_OVERLAY_COLOR = "rgba(0, 0, 0, 0.45)";

const ImageOverlay = (props?: ImageOverlayProps): React.ReactElement<ImageBackgroundProps> => {
    const { style, children, ...imageBackgroundProps } = props;
    const { overlayColor, ...imageBackgroundStyle } = StyleSheet.flatten(style);

    return (
        <ImageBackground {...imageBackgroundProps} style={imageBackgroundStyle}>
            <View style={[StyleSheet.absoluteFill, { backgroundColor: overlayColor || DEFAULT_OVERLAY_COLOR }]} />
            {children}
        </ImageBackground>
    );
};

export { ImageOverlay, ImageOverlayProps };
