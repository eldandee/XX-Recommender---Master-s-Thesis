import { SetAppReadyStateAction } from ".";

export const setAppReadyState = (ready: boolean): SetAppReadyStateAction => ({
    type: "SET_APP_READY_STATE",
    ready,
});
