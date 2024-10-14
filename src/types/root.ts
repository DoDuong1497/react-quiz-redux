import { IStateQuestion } from "./question";

export type IRootState = {
  question: IStateQuestion;
};

export type IAction = {
  type: string;
  payload: any;
};
