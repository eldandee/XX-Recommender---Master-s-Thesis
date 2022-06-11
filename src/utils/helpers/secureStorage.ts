import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";
import { Platform } from "react-native";

/**
 * Secure storage using expo secure storage
 * Documentation: https://docs.expo.io/versions/latest/sdk/securestore/
 * added option for web debugging
 */
const setSecureKey = async (key: string, value: string) => {
    try {
        if (Platform.OS === "ios" || Platform.OS === "android") {
            return await SecureStore.setItemAsync(key, value);
        } else {
            localStorage.setItem(key, value);
        }
    } catch (error) {
        console.log(error);
    }
};

const getSecureKey = async (key: string) => {
    try {
        if (Platform.OS === "ios" || Platform.OS === "android") {
            return await SecureStore.getItemAsync(key);
        } else {
            return localStorage.getItem(key);
        }
    } catch (error) {
        console.log(error);
    }
};

const deleteSecureKey = async (key: string) => {
    try {
        if (Platform.OS === "ios" || Platform.OS === "android") {
            return await SecureStore.deleteItemAsync(key);
        } else {
            return localStorage.removeItem(key);
        }
    } catch (error) {
        console.log(error);
    }
};

const getUserFromToken = (token: string) => {
    const decoded = jwt_decode(token);
    return decoded;
};

export { setSecureKey, getSecureKey, deleteSecureKey, getUserFromToken };
