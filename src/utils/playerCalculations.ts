import { Player } from "../../datamodel/types";

export const calculatePoints = (player: Player) => {
  const battingStrikeRate = (player.total_runs / player.balls_faced) * 100;
  const battingAverage = player.total_runs / player.innings_played;
  const bowlingStrikeRate = (player.overs_bowled * 6) / player.wickets;
  const bowlingEconomy = player.runs_conceded / player.overs_bowled;

  const points =
    battingStrikeRate / 5 +
    battingAverage * 0.8 +
    (500 / bowlingStrikeRate + 140 / bowlingEconomy);

  return points;
};

export const calculateValue = (points: number) => {
  return Math.round(((9 * points + 100) * 1000) / 50000) * 50000;
};
