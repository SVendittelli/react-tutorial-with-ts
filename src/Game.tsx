import { useState } from "react";
import Board from "./board/Board";
import GameInfo from "./GameInfo";
import { Move, Player } from "./types/model";
import { calculateWinner, getMoveNotation } from "./utils";

export interface GameState {
  boardState: Move[];
  lastMove: string;
}

const Game = () => {
  const [history, setHistory] = useState([
    {
      boardState: Array(9).fill(null),
      lastMove: "",
    },
  ] as GameState[]);
  const [stepNumber, setStepNumber] = useState(0);

  const nextPlayer: Player = stepNumber % 2 === 0 ? "X" : "O";

  const handleBoardClick = (squareNum: number) => {
    const historySlice = history.slice(0, stepNumber + 1);

    const squares = historySlice[historySlice.length - 1].boardState.slice();

    // If the square is already set, return
    if (squares[squareNum]) {
      return;
    }

    // If the game is already won, return
    let winner = calculateWinner(squares);
    if (winner) {
      return;
    }

    // Else, make move and recheck for winner
    squares[squareNum] = nextPlayer;
    winner = calculateWinner(squares);

    setHistory([
      ...historySlice,
      {
        boardState: squares,
        lastMove: getMoveNotation(
          nextPlayer,
          {
            column: "abc"[squareNum % 3],
            row: (3 - Math.floor(squareNum / 3)).toString(),
          },
          winner === nextPlayer
        ),
      },
    ]);
    setStepNumber(historySlice.length);
  };

  return (
    <div className="game">
      <Board
        squares={history[stepNumber].boardState}
        onClick={(squareNum) => handleBoardClick(squareNum)}
      />

      <GameInfo
        history={history}
        stepNumber={stepNumber}
        nextPlayer={nextPlayer}
        setStepNumber={setStepNumber}
      />
    </div>
  );
};

export default Game;
