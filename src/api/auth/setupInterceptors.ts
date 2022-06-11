import axios, { AxiosError, AxiosResponse } from "axios";

import { actions } from "../../actions";
import { store } from "../../store/configureStore";
import { RefreshAccessTokenResponseDto } from "../responses";
import { refreshAccessToken } from "./api";
import { setAccessToken } from "./tokens";

const valid401Endpoints = ["/auth/refreshAccessToken", "/auth/login"];

// Interceptor for refreshing access token if 401 error is thrown
const validateToken = async (error: AxiosError) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !valid401Endpoints.includes(originalRequest.url)) {
        if (originalRequest.headers["requestCallback"] === true) {
            console.error("THIS SHOULD NOT HAPPEN");
            return Promise.reject(error);
        }
        try {
            const refreshToken = store.getState().auth.refreshToken;
            if (refreshToken) {
                const response: AxiosResponse<RefreshAccessTokenResponseDto> = await refreshAccessToken(refreshToken);
                store.dispatch(
                    actions.auth.refreshAccessTokenSuccess(response.status, {
                        refreshToken,
                        accessToken: response.data.accessToken,
                    }),
                );
                setAccessToken(response.data.accessToken);
                originalRequest.headers["Authorization"] = "Bearer " + response?.data?.accessToken;
                originalRequest.headers["requestCallback"] = true;
                return axios(originalRequest);
            } else {
                console.error("THIS SHOULD NOT HAPPEN");
                return Promise.reject(error);
            }
        } catch (_error) {
            return Promise.reject(_error);
        }
    }
    return Promise.reject(error);
};

const setupInterceptors = () => {
    axios.interceptors.response.use(
        res => res,
        error => validateToken(error as AxiosError),
    );
};

export { setupInterceptors };
