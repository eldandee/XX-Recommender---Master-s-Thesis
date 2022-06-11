import {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetModal,
    useBottomSheet,
    BottomSheetBackgroundProps,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo } from "react";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, { Extrapolate, interpolate, useAnimatedStyle, interpolateColor } from "react-native-reanimated";

/**
 * Author of library: Mo Gorhom
 * URL: https://github.com/gorhom/react-native-bottom-sheet
 *
 * Code is inspired by github repository of library and its documentation.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2020 Mo Gorhom
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
const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(animatedIndex.value, [0, 1], [0, 1], Extrapolate.CLAMP),
    }));
    const { close } = useBottomSheet();
    const containerStyle = useMemo(
        () => [
            style,
            {
                backgroundColor: "black",
            },
            containerAnimatedStyle,
        ],
        [style, containerAnimatedStyle],
    );
    return (
        <TapGestureHandler onGestureEvent={() => close()}>
            <Animated.View style={containerStyle} />
        </TapGestureHandler>
    );
};

const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({ style, animatedIndex }) => {
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(animatedIndex.value, [0, 1], ["#1F1E3D", "#1F1E3D"]),
        borderRadius: 20,
    }));
    const containerStyle = useMemo(() => [style, containerAnimatedStyle], [style, containerAnimatedStyle]);
    return <Animated.View pointerEvents="none" style={containerStyle} />;
};

interface MovieBottomSheetProps {
    innerRef: React.MutableRefObject<BottomSheetModal | null>;
    content: React.ReactNode;
    snapPoint: string;
}
const MovieBottomSheet = (props: MovieBottomSheetProps) => {
    const renderBackdrop = useCallback(
        props => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} pressBehavior="close" />,
        [],
    );
    return (
        <BottomSheetModal
            index={0}
            enablePanDownToClose
            backdropComponent={renderBackdrop}
            backgroundComponent={CustomBackground}
            handleStyle={{ backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20, opacity: 0.1 }}
            ref={props.innerRef}
            snapPoints={[props.snapPoint]}>
            {props.content}
        </BottomSheetModal>
    );
};

export { MovieBottomSheet, CustomBackground, CustomBackdrop };
