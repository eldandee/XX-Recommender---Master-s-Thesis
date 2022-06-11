import { MessageResponseDto } from "../../api/movies/generated";

interface ApiErrorHandlingState {
    error: boolean;
    errorResponse?: MessageResponseDto;
}

const ApiErrorHandlingInitialState: ApiErrorHandlingState = {
    error: false,
};

export { ApiErrorHandlingInitialState };
export type { ApiErrorHandlingState };
