export type IStateLeaderBoard = {
  leaderboards: ILeaderboards[]
};

export type ILeaderboards = {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  score: number
};
