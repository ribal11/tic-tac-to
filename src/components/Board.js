import React, { useState, useEffect } from "react";
import Button from "./Button"; // Assuming Button component is imported and used

export default function Board({ isX, squares, onPlay }) {
  const [winningLine, setWinningLine] = useState(null);
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
  const res = calculateWinner(squares, lines);
  useEffect(() => {
    if (res) {
      setWinningLine(res.index);
    } else {
      setWinningLine(null);
    }
  }, [res]);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares, lines)) return;
    const nextSquares = squares.slice();
    if (isX) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  let status;
  if (res) {
    status = "Winner: " + res.winner[0];
  } else {
    status = "Next player: " + (isX ? "X" : "O");
  }

  function renderBoard() {
    const board = [];
    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 3; j++) {
        const current = i * 3 + j;
        const isWinnerSquare =
          winningLine &&
          (current === lines[winningLine][0] ||
            current === lines[winningLine][1] ||
            current === lines[winningLine][2]);

        row.push(
          <Button
            key={current}
            value={squares[current]}
            className={isWinnerSquare ? "winner" : ""}
            onSquareClick={() => handleClick(current)}
          />
        );
      }
      board.push(
        <div className="board-row" key={i}>
          {row}
        </div>
      );
    }
    return board;
  }

  return (
    <>
      <div className="status">{status}</div>
      {renderBoard()}
    </>
  );
}

function calculateWinner(squares, lines) {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: lines[i], index: i };
    }
  }
  return null;
}
