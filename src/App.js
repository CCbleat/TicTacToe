import React from "react";
import { useState, useEffect } from "react";
import { calculateWinner, getPosition, getWinnerList } from "./utils";
import Square from "./components/Square";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [position, setPosition] = useState([]);
  const [isReverse, setIsReverse] = useState(false);
  const xIsNext = currentMove % 2 === 0; // 管理X是否是下一个玩家, can derived from currentMove
  const currentSquares = history[currentMove];

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
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          currentMove={currentMove}
        />
        {position.length > 0 ? (
          <p>{`Current position: X: ${position[0]}, Y: ${position[1]}`}</p>
        ) : null}
      </div>
      <div className="game-info">
        <div>
          <button onClick={() => setIsReverse(!isReverse)}>
            Switch Sorted
          </button>
          {/* <button></button> */}
        </div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function Board({ xIsNext, squares, onPlay, currentMove }) {
  const [winnerList, setWinnerList] = useState([-1, -1, -1]); // 保存赢家列表

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

  useEffect(() => {
    setWinnerList(getWinnerList(squares));
  }, [squares]);

  // display if there is already a winner
  // otherwise display next player
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (currentMove < 9) {
    status = "Next player: " + (xIsNext ? "X" : "O");
  } else {
    status = "Draw";
  }

  const boardSize = 3;
  const boardRow = [];
  for (let i = 0; i < 3; i++) {
    const rowSquares = [];
    for (let j = 0; j < 3; j++) {
      const index = i * boardSize + j;
      rowSquares.push(
        <Square
          key={"index" + index}
          index={index}
          winnerList={winnerList}
          value={squares[index]}
          onSquareClick={() => handleClick(index)}
        ></Square>
      );
    }
    boardRow.push(
      <div key={"boardRow" + i} className="board-row">
        {rowSquares}
      </div>
    );
  }

  return (
    <div>
      <div className="status">{status}</div>
      {boardRow}
    </div>
  );
}
