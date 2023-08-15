import React from "react";
import { useState } from "react";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [position, setPosition] = useState([]);
  const [isReverse, setIsReverse] = useState(true);
  const xIsNext = currentMove % 2 === 0; // 管理X是否是下一个玩家, can derived from currentMove
  const currentSquares = history[currentMove];

  function getPosition(i) {
    let row = Math.floor(i / 3) + 1,
      column = (i % 3) + 1;
    return [row, column];
  }

  function handlePlay(nextSquares, nextIndex) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setPosition(getPosition(nextIndex));
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    if (nextMove === 0) {
      setPosition([]);
    }
  }

  function getMoves() {
    const res = history.map((squares, move) => {
      let description;
      if (move > 0) {
        description = "Go to move #" + move;
      } else {
        description = "Go to game start";
      }
      return (
        // 这里由于 落子永远不会被重新排序、删除或从中间插入，
        // 因此使用落子的索引作为 key 是安全的。
        <li key={move}>
          <button
            onClick={() => jumpTo(move)}
            className={move === currentMove ? "current-step" : ""}
          >
            {description}
          </button>
        </li>
      );
    });
    if (isReverse) {
      return res.slice().reverse();
    }
    return res;
  }

  const moves = getMoves();

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        {position.length > 0 ? (
          <p>{`Current position: X: ${position[0]}, Y: ${position[1]}`}</p>
        ) : null}
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return; // 如果已经有值了，就不再处理

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares, i);
  }

  // display if there is already a winner
  // otherwise display next player
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const boardSize = 3;
  const boardRow = [];
  for (let i = 0; i < 3; i++) {
    const rowSquares = [];
    for (let j = 0; j < 3; j++) {
      const index = i * boardSize + j;
      rowSquares.push(
        <Square
          value={squares[index]}
          onSquareClick={() => handleClick(index)}
        ></Square>
      );
    }
    boardRow.push(<div className="board-row">{rowSquares}</div>);
  }

  return (
    <div>
      <div className="status">{status}</div>
      {boardRow}
    </div>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  // list all possibles that lead to a winner
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // horizontal
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // vertical
    [0, 4, 8], // diagonal
    [2, 4, 6],
  ];

  // check if any of the possibles is a winner
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]; // destructuring
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // if there is a winner, return the winner
      return squares[a];
    }
  }
  return null; // if there is no winner, return null
}
