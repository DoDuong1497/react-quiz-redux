import { ILeaderboards } from "../types/leaderboard";

export const updateLeaderboard = (params: ILeaderboards) => {
  return {
    type: "UPDATE_LEADER_BOARD",
    payload: params,
  };
};
