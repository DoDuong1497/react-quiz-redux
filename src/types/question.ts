export type IAction = {
  type: string;
  payload: any;
};

export type IStateQuestion = IParamsQuestion;

export type IParamsQuestion = {
  category: string;
  type: string;
  difficulty: string;
  amount: number;
  score: number;
};
