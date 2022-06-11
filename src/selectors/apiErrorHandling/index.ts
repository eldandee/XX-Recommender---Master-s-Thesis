import { ApiErrorHandlingState } from "../../interfaces/reducers/apiErrorHandlingState";
import { RootState } from "../../store/configureStore";

const getApiErrorHandling = (state: RootState): ApiErrorHandlingState => state.apiErrorHandling;

export { getApiErrorHandling };
