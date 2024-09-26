import { IParamsQuestion } from "../types/question"

export const setParamsQuestion = (params: IParamsQuestion) => {
  return {
    type: 'SET_PARAMS_QUESTION',
    payload: params
  }
}