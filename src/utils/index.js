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

function commonServicOfCalculateWinner(squares, isReturnListFlag = false) {
  // check if any of the possibles is a winner

  if (!isReturnListFlag) {
    for (let i = 0; i < lines.length; i++) {
      let [a, b, c] = lines[i]; // destructuring
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        // if there is a winner, return the winner
        return squares[a];
      }
    } // if there is no winner, return null
    return null;
  } else {
    let winnerList = [-1, -1, -1];
    for (let i = 0; i < lines.length; i++) {
      let [a, b, c] = lines[i]; // destructuring
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        // if there is a winner, return the winner
        return [a, b, c];
      }
    }
    return winnerList;
  }
}

function calculateWinner(squares) {
  return commonServicOfCalculateWinner(squares, false);
}

function getWinnerList(squares) {
  return commonServicOfCalculateWinner(squares, true);
}

function getPosition(i) {
  let row = Math.floor(i / 3) + 1,
    column = (i % 3) + 1;
  return [row, column];
}

export { calculateWinner, getWinnerList, getPosition };
