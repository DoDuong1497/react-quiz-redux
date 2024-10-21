import { combineReducers, createStore } from "redux";
import { questionReducer } from "../redux/question.reducer";
import { leaderBoardReducer } from "../redux/leaderBoard.reducer";

const rootReducer = combineReducers({
  question: questionReducer,
  leaderboards: leaderBoardReducer,
});

export const store = createStore(rootReducer);
