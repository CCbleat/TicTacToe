import React from "react";

export default function Square({ value, onSquareClick, winnerList, index }) {
  return (
    <button
      className={
        winnerList[0] === index ||
        winnerList[1] === index ||
        winnerList[2] === index
          ? "square win-square"
          : "square"
      }
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
