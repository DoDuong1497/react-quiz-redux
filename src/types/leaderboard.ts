export type IFormInfo = {
  firstname: string;
  lastname: string;
  email: string;
};

export type IStateLeaderboard = {
  leaderboards: ILeaderboard[];
};

export type ILeaderboard = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  score: number;
};
