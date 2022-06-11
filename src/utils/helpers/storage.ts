import AsyncStorage from "@react-native-async-storage/async-storage";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Image } from "react-native";

const getKey = async (key: string) => {
    try {
        return await AsyncStorage.getItem(key);
    } catch (error) {
        console.log(error);
    }
};

const setKey = async (key: string, value: string) => {
    try {
        return await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log(error);
    }
};

const cacheImages = (images: any) => {
    return images.map(image => {
        if (typeof image === "string") {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
};

const cacheFonts = (fonts: any) => {
    return fonts.map(font => Font.loadAsync(font));
};

export { cacheFonts, cacheImages, getKey, setKey };
