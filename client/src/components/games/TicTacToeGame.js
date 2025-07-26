import React, { useState, useEffect } from 'react';

const TicTacToeGame = ({ onGameEnd }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ player: 0, ai: 0, ties: 0 });
  const [startTime, setStartTime] = useState(null);

  const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  const checkWinner = (board) => {
    for (let line of winningLines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return board.includes(null) ? null : 'tie';
  };

  const minimax = (board, depth, isMaximizing) => {
    const winner = checkWinner(board);
    
    if (winner === 'O') return 10 - depth;
    if (winner === 'X') return depth - 10;
    if (winner === 'tie') return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = 'O';
          const score = minimax(board, depth + 1, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = 'X';
          const score = minimax(board, depth + 1, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const getBestMove = (board) => {
    let bestScore = -Infinity;
    let bestMove = null;
    
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        const score = minimax(board, 0, false);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };

  const handleCellClick = (index) => {
    if (board[index] || gameOver || !isPlayerTurn) return;

    if (!startTime) {
      setStartTime(Date.now());
    }

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsPlayerTurn(false);

    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      endGame(gameResult);
    }
  };

  const endGame = (result) => {
    setGameOver(true);
    setWinner(result);
    
    const endTime = Date.now();
    const gameTime = startTime ? Math.floor((endTime - startTime) / 1000) : 0;
    
    let gameScore = 0;
    if (result === 'X') {
      setScore(prev => ({ ...prev, player: prev.player + 1 }));
      gameScore = 100;
    } else if (result === 'O') {
      setScore(prev => ({ ...prev, ai: prev.ai + 1 }));
      gameScore = 0;
    } else {
      setScore(prev => ({ ...prev, ties: prev.ties + 1 }));
      gameScore = 50;
    }
    
    onGameEnd(gameScore, gameTime);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameOver(false);
    setWinner(null);
    setStartTime(null);
  };

  const resetScore = () => {
    setScore({ player: 0, ai: 0, ties: 0 });
  };

  useEffect(() => {
    if (!isPlayerTurn && !gameOver) {
      const timer = setTimeout(() => {
        const aiMove = getBestMove([...board]);
        if (aiMove !== null) {
          const newBoard = [...board];
          newBoard[aiMove] = 'O';
          setBoard(newBoard);
          setIsPlayerTurn(true);

          const gameResult = checkWinner(newBoard);
          if (gameResult) {
            endGame(gameResult);
          }
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, board, gameOver]);

  const renderCell = (index) => {
    const value = board[index];
    let cellContent = '';
    let cellClass = 'tic-tac-toe-cell';

    if (value === 'X') {
      cellContent = '❌';
      cellClass += ' cell-x';
    } else if (value === 'O') {
      cellContent = '⭕';
      cellClass += ' cell-o';
    }

    return (
      <button
        key={index}
        className={cellClass}
        onClick={() => handleCellClick(index)}
        disabled={gameOver || !isPlayerTurn || board[index]}
      >
        {cellContent}
      </button>
    );
  };

  const getStatusMessage = () => {
    if (gameOver) {
      if (winner === 'X') return '🎉 You Win!';
      if (winner === 'O') return '🤖 AI Wins!';
      return '🤝 It\'s a Tie!';
    }
    return isPlayerTurn ? '🎯 Your Turn' : '🤖 AI Thinking...';
  };

  return (
    <div className="tic-tac-toe-game">
      <div className="game-header">
        <h3>❌⭕ Tic Tac Toe vs AI</h3>
        <div className="game-status">{getStatusMessage()}</div>
      </div>

      <div className="score-section">
        <div className="score-item">
          <span className="score-label">You:</span>
          <span className="score-value">{score.player}</span>
        </div>
        <div className="score-item">
          <span className="score-label">AI:</span>
          <span className="score-value">{score.ai}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Ties:</span>
          <span className="score-value">{score.ties}</span>
        </div>
      </div>

      <div className="tic-tac-toe-board">
        {Array(9).fill().map((_, index) => renderCell(index))}
      </div>

      <div className="game-controls">
        <button className="game-button" onClick={resetGame}>
          🔄 New Game
        </button>
        <button className="game-button secondary" onClick={resetScore}>
          📊 Reset Score
        </button>
      </div>

      <div className="game-instructions">
        <p>🎯 You are ❌ (X), AI is ⭕ (O)</p>
        <p>🏆 Get three in a row to win!</p>
        <p>🧠 The AI uses minimax algorithm - good luck!</p>
      </div>

      <style jsx>{`
        .tic-tac-toe-game {
          max-width: 400px;
          margin: 0 auto;
          text-align: center;
        }

        .game-header h3 {
          color: #1f2937;
          margin-bottom: 10px;
        }

        .game-status {
          font-size: 1.1rem;
          font-weight: 600;
          color: #3b82f6;
          margin-bottom: 20px;
          padding: 10px;
          background: #eff6ff;
          border-radius: 8px;
        }

        .score-section {
          display: flex;
          justify-content: space-around;
          background: #f8fafc;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .score-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .score-label {
          font-size: 0.9rem;
          color: #6b7280;
          margin-bottom: 5px;
        }

        .score-value {
          font-size: 1.5rem;
          font-weight: bold;
          color: #1f2937;
        }

        .tic-tac-toe-board {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 8px;
          max-width: 300px;
          margin: 0 auto 20px;
          background: #e5e7eb;
          padding: 8px;
          border-radius: 12px;
        }

        .tic-tac-toe-cell {
          width: 80px;
          height: 80px;
          background: white;
          border: none;
          border-radius: 8px;
          font-size: 2rem;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tic-tac-toe-cell:hover:not(:disabled) {
          background: #f3f4f6;
          transform: scale(1.05);
        }

        .tic-tac-toe-cell:disabled {
          cursor: not-allowed;
        }

        .cell-x {
          background: #fee2e2;
        }

        .cell-o {
          background: #dbeafe;
        }

        .game-controls {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-bottom: 20px;
        }

        .game-button {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.2s;
        }

        .game-button:hover {
          background: #2563eb;
        }

        .game-button.secondary {
          background: #6b7280;
        }

        .game-button.secondary:hover {
          background: #4b5563;
        }

        .game-instructions {
          background: #f0fdf4;
          padding: 15px;
          border-radius: 8px;
          color: #166534;
        }

        .game-instructions p {
          margin: 5px 0;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};

export default TicTacToeGame;
