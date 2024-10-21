import { ILeaderboard } from "../types/leaderboard";

export const updateLeaderBoard = (info: ILeaderboard) => {
  return {
    type: "UPDATE_LEADER_BOARD",
    payload: info,
  };
};
