import { AuthState } from "../../interfaces/reducers/authState";
import { RootState } from "../../store/configureStore";

const getAuth = (state: RootState): AuthState => state.auth;

export { getAuth };
