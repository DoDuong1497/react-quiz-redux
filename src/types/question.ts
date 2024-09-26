export type IAction = {
  type: string,
  payload: any
}

export type IStateQuestion = IParamsQuestion;

export type IParamsQuestion = {
  category: string,
  difficulty: string,
  type: string,
  amount: number
}