import { combineReducers, createStore } from "redux";

import { questionReducer } from "../redux/question.reducer";
import { leaderboardReducer } from "../redux/leaderboard.reducer";

const rootReducer = combineReducers({
  question: questionReducer,
  leaderboard: leaderboardReducer
});

export const store = createStore(rootReducer);
