import { setSecureKey, getSecureKey, deleteSecureKey } from "../../utils/helpers/secureStorage";

// Storing tokens in local storage on web/encrypted storage on mobile devices
const setAccessToken = async (token: string) => await setSecureKey("accessToken", token);
const setRefreshToken = async (token: string) => await setSecureKey("refreshToken", token);
const getRefreshToken = async () => await getSecureKey("refreshToken");
const getAccessToken = async () => await getSecureKey("accessToken");
const deleteTokens = async () => {
    await deleteSecureKey("accessToken");
    await deleteSecureKey("refreshToken");
};

export { setAccessToken, setRefreshToken, getRefreshToken, getAccessToken, deleteTokens };
