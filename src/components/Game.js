import { useState } from "react";
import Board from "./Board";
export default function Game() {
  const [isX, setIsX] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [ascOrder, setAscOrder] = useState(true);
  const currentSquare = history[currentMove];
  function handlePlay(nextSquare) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setIsX(!isX);
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setIsX(nextMove % 2 === 0);
  }

  function changeOrder() {
    setAscOrder(!ascOrder);
  }
  const move = history.map((sqaures, move) => {
    let description;
    let index;
    if (ascOrder) index = move;
    else {
      index = history.length - 1 - move;
    }
    if (index > 0) {
      description = "Go to Move #" + index;
    } else {
      description = "Go to Game Start";
    }
    return index < history.length - 1 ? (
      <li key={index}>
        <button onClick={() => jumpTo(index)}>{description}</button>
      </li>
    ) : (
      <li key={index}>move # {index}</li>
    );
  });
  return (
    <>
      <button onClick={changeOrder}>toggle</button>
      <div className="game">
        <div className="game-board">
          <Board isX={isX} squares={currentSquare} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ol>{move}</ol>
        </div>
      </div>
    </>
  );
}
