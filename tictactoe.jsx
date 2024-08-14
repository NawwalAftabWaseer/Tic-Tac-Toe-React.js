import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import "./TicTacToe.css";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameStatus, setGameStatus] = useState("");
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [winningLine, setWinningLine] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const calculateWinner = (squares) => {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  };

  useEffect(() => {
    const result = calculateWinner(board);
    if (result) {
      setGameStatus(`${result.winner} wins!`);
      setScores((prevScores) => ({
        ...prevScores,
        [result.winner]: prevScores[result.winner] + 1,
      }));
      setGameOver(true);
      setWinningLine(result.line);
      setShowConfetti(true);
    } else if (board.every(Boolean)) {
      setGameStatus("It's a draw!");
      setScores((prevScores) => ({
        ...prevScores,
        draws: prevScores.draws + 1,
      }));
      setGameOver(true);
    } else {
      setGameStatus(`Next player: ${xIsNext ? "X" : "O"}`);
    }
  }, [board, xIsNext]);

  const handleClick = (i) => {
    if (gameOver || board[i]) return;
    const newBoard = board.slice();
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => (
    <button
      className={`square ${
        winningLine && winningLine.includes(i) ? "winning" : ""
      }`}
      onClick={() => handleClick(i)}
    >
      {board[i] === "X" && <span className="tick">X</span>}
      {board[i] === "O" && <span className="cross">O</span>}
    </button>
  );

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameStatus("Next player: X");
    setGameOver(false);
    setWinningLine(null);
    setShowConfetti(false);
  };

  return (
    <div className="game-container">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={1000}
          gravity={0.1}
        />
      )}
      <div className="game">
        <div className="game-board">
          {board.map((_, index) => renderSquare(index))}
        </div>
        <div className="game-info">
          <div className="status">{gameStatus}</div>
          <button onClick={resetGame}>Reset Game</button>
          <div className="scores">
            <p>
              <span className="tick">X</span>: {scores.X}
            </p>
            <p>
              <span className="cross">O</span>: {scores.O}
            </p>
            <p>Draws: {scores.draws}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
