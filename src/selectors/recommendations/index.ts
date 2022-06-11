import { RecommendationsState } from "../../interfaces/reducers/recommendationsState";
import { RootState } from "../../store/configureStore";

const getRecommendations = (state: RootState): RecommendationsState => state.recommendations;

export { getRecommendations };
