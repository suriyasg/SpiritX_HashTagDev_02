import { Player } from "../../datamodel/types";

export const calculatePoints = (player: Player) => {
  const battingStrikeRate =
    Number(player.balls_faced) !== 0
      ? (Number(player.total_runs) / Number(player.balls_faced)) * 100
      : 0;
  const battingAverage =
    Number(player.innings_played) !== 0
      ? Number(player.total_runs) / Number(player.innings_played)
      : 0;
  const bowlingStrikeRate =
    Number(player.wickets) !== 0
      ? (Number(player.overs_bowled) * 6) / Number(player.wickets)
      : 0;
  const bowlingEconomy =
    Number(player.overs_bowled) !== 0
      ? Number(player.runs_conceded) / Number(player.overs_bowled)
      : 0;

  let points = battingStrikeRate / 5 + battingAverage * 0.8;
  if (bowlingStrikeRate !== 0) {
    points += 500 / bowlingStrikeRate;
  }
  if (bowlingEconomy !== 0) {
    points += 140 / bowlingEconomy;
  }
  return points;
};

export const calculateValue = (points: number) => {
  const val = (9 * points + 100) * 1000;
  return Math.round(val / 50000) * 50000;
};
