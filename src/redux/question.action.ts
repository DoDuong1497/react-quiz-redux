import { IParamsQuestion } from "../types/question";

export const setParamsQuestion = (params: IParamsQuestion) => {
  return {
    type: "SET_PARAMS_QUESTION",
    payload: params,
  };
};

export const updateScore = () => {
  return {
    type: "UPDATE_SCORE",
  };
};

export const resetScore = () => {
  return {
    type: "RESET_SCORE",
  };
};
