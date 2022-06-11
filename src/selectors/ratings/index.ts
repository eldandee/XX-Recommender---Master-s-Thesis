import { RatingsState } from "../../interfaces/reducers/ratingsState";
import { RootState } from "../../store/configureStore";

const getRatings = (state: RootState): RatingsState => state.ratings;

export { getRatings };
