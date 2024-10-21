import { IStateLeaderboard } from "./leaderboard";
import { IStateQuestion } from "./question";

export type IRootState = {
  question: IStateQuestion;
};

export type IRootLeaderBoardState = {
  leaderboards: IStateLeaderboard;
};

export type IAction = {
  type: string;
  payload: any;
};
