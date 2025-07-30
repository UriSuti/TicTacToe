import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const initialBoard = Array(9).fill(null);

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(win);
      saveResult(win);
    }
    setXIsNext(!xIsNext);
  };

  const saveResult = async (winner) => {
    try {
      await axios.post(`${proccess.env.REACT_APP_API_URL}/result`, { winner });
    } catch (err) {
      console.error(err);
    }
  };

  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  const restartGame = () => {
    setBoard(initialBoard);
    setXIsNext(true);
    setWinner(null);
  };

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {[0, 1, 2].map((i) => (
          <div key={i} className="board-row">
            {renderSquare(i * 3)}
            {renderSquare(i * 3 + 1)}
            {renderSquare(i * 3 + 2)}
          </div>
        ))}
      </div>
      {winner && <p>Winner: {winner}</p>}
      <button onClick={restartGame}>Restart</button>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;
