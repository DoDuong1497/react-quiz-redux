import { IAction, IStateQuestion } from "../types/question";

const initializeState: IStateQuestion = {
  category: "",
  type: "",
  difficulty: "",
  amount: 0,
};

export const questionReducer = (state = initializeState, action: IAction) => {
  switch (action.type) {
    case "SET_PARAMS_QUESTION": {
      return {
        ...state,
        category: action.payload.category,
        type: action.payload.type,
        difficulty: action.payload.difficulty,
        amount: action.payload.amount,
      };
    }
    default: {
      return state;
    }
  }
};
