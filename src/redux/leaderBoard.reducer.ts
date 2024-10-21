import { IStateLeaderboard } from "../types/leaderboard";
import { IAction } from "../types/root";

const initializeState: IStateLeaderboard = {
  leaderboards: [],
};

export const leaderBoardReducer = (
  state = initializeState,
  action: IAction
) => {
  switch (action.type) {
    case "UPDATE_LEADER_BOARD": {
      return {
        ...state,
        leaderboards: [...state.leaderboards, action.payload],
      };
    }

    default: {
      return state;
    }
  }
};
