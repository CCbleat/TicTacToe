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

function getPosition(i) {
  let row = Math.floor(i / 3) + 1,
    column = (i % 3) + 1;
  return [row, column];
}

export { calculateWinner, getPosition };
