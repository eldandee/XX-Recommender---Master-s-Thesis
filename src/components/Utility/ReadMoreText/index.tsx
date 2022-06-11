import { Text } from "@ui-kitten/components";
import React, { useState, useEffect, useCallback } from "react";
import { NativeSyntheticEvent, TextLayoutEventData, TextStyle, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";

interface ReadMoreTextProps {
    readMoreStyle?: TextStyle;
    text: string;
    textStyle?: TextStyle;
    linesThreshold?: number;
}
/**
 * Source inspired by StackOverflow thread
 *
 * question: https://stackoverflow.com/questions/55805233/how-to-show-for-text-more-less-in-react-naitve-javascript
 * authors in thread: https://stackoverflow.com/users/9184602/ankit https://stackoverflow.com/users/1815028/anilkumar-ios-reactnative https://stackoverflow.com/users/7581249/milore
 * https://stackoverflow.com/users/8101147/nanettecodes https://stackoverflow.com/users/13971256/santiago-yepes https://stackoverflow.com/users/8239116/aurangzaib-rana https://stackoverflow.com/users/14351198/muhammad-tayyab
 *
 * **/
const ReadMoreText: React.FC<ReadMoreTextProps> = ({ readMoreStyle, text, textStyle, linesThreshold = 3 }) => {
    const [showMoreButton, setShowMoreButton] = useState(false); // if there is line then lines threshold there is not Read less or Read more button
    const [shownReadLessButton, setShownReadLessButton] = useState(false); // user can switch between Read more and Read less (if there is more then threshold lines)
    const [numberOfLines, setNumberOfLines] = useState<number | undefined>(undefined);
    const tailwind = useTailwind();

    useEffect(() => {
        setNumberOfLines(shownReadLessButton ? undefined : linesThreshold);
    }, [shownReadLessButton]);

    const onTextLayout = useCallback(
        (event: NativeSyntheticEvent<TextLayoutEventData>) => {
            if (event.nativeEvent.lines.length > 3 && !shownReadLessButton) {
                setShowMoreButton(true);
                setNumberOfLines(linesThreshold);
            }
        },
        [shownReadLessButton],
    );

    return (
        <>
            <Text onTextLayout={onTextLayout} numberOfLines={numberOfLines} style={textStyle} ellipsizeMode="tail">
                {text}
            </Text>
            {showMoreButton && (
                <View style={tailwind("items-center my-1 text-sm")}>
                    <Text onPress={() => setShownReadLessButton(!shownReadLessButton)} style={readMoreStyle}>
                        {shownReadLessButton ? "See less" : "See more"}
                    </Text>
                </View>
            )}
        </>
    );
};

export { ReadMoreText, ReadMoreTextProps };
