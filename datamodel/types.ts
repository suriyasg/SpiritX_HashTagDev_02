export type Admin = {
  admin_id: string;
  admin_name: string;
  password: string;
};

export type LeaderBoardRecord = {
  user_id: string;
  username: string;
  team_total_points: number;
};

export type User = {
  user_id: string;
  username: string;
  password: string;
  money: number;
  player_ids?: string[];
  team_total_points?: number;
};

export type Player = {
  player_id: string;
  name: string;
  university: string;
  category: string;
  total_runs: string;
  balls_faced: string;
  innings_played: string;
  wickets: string;
  overs_bowled: string;
  runs_conceded: string;
  player_points?: number;
};
