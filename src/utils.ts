import { Move, Player } from "./types/model";

export const getMoveNotation: (
  player: Player,
  coord: { column: string; row: string },
  isWinner: boolean
) => string = (player, { column, row }, isWinner) =>
  [player, column, row, isWinner ? "#" : ""].join("");

export const calculateWinner = (squares: Move[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const line of lines) {
    const winner = squares[line[0]];
    if (line.every((piece) => squares[piece] === winner)) {
      return winner as Player;
    }
  }
};
