import { BaseAction } from "../";

export const resetApiCallErrorState = (): BaseAction => ({
    type: "RESET_API_CALL_ERROR_STATE",
});
