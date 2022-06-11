import { AppState } from "../../interfaces/reducers/appState";
import { RootState } from "../../store/configureStore";

const getAppState = (state: RootState): AppState => state.app;

export { getAppState };
