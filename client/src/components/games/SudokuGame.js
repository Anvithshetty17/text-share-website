import React, { useState, useEffect } from 'react';
import './SudokuGame.css';

const SudokuGame = ({ onGameEnd }) => {
  const [board, setBoard] = useState([]);
  const [solution, setSolution] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [startTime, setStartTime] = useState(null);
  const [errors, setErrors] = useState(0);

  const difficulties = {
    easy: 40,
    medium: 50,
    hard: 60
  };

  const isValidMove = (board, row, col, num) => {
    // Check row
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) return false;
    }

    // Check column
    for (let x = 0; x < 9; x++) {
      if (board[x][col] === num) return false;
    }

    // Check 3x3 box
    let startRow = row - (row % 3);
    let startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i + startRow][j + startCol] === num) return false;
      }
    }

    return true;
  };

  const solveSudoku = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValidMove(board, row, col, num)) {
              board[row][col] = num;
              if (solveSudoku(board)) {
                return true;
              }
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const generateBoard = () => {
    // Create empty board
    let newBoard = Array(9).fill().map(() => Array(9).fill(0));
    
    // Fill diagonal 3x3 boxes
    for (let i = 0; i < 9; i += 3) {
      fillBox(newBoard, i, i);
    }
    
    // Solve the board
    solveSudoku(newBoard);
    
    // Create solution copy
    let fullSolution = newBoard.map(row => [...row]);
    
    // Remove numbers based on difficulty
    let cellsToRemove = difficulties[difficulty];
    for (let i = 0; i < cellsToRemove; i++) {
      let row = Math.floor(Math.random() * 9);
      let col = Math.floor(Math.random() * 9);
      if (newBoard[row][col] !== 0) {
        newBoard[row][col] = 0;
      } else {
        i--; // Try again if cell already empty
      }
    }
    
    return { puzzle: newBoard, solution: fullSolution };
  };

  const fillBox = (board, row, col) => {
    let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    // Shuffle array
    for (let i = nums.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    
    let index = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board[row + i][col + j] = nums[index++];
      }
    }
  };

  const startGame = () => {
    const { puzzle, solution: fullSolution } = generateBoard();
    setBoard(puzzle);
    setSolution(fullSolution);
    setGameStarted(true);
    setGameWon(false);
    setSelectedCell(null);
    setStartTime(Date.now());
    setErrors(0);
  };

  const handleCellClick = (row, col) => {
    if (!gameStarted || gameWon || solution[row][col] !== 0) return;
    setSelectedCell([row, col]);
  };

  const handleNumberInput = (num) => {
    if (!selectedCell || !gameStarted || gameWon) return;
    
    const [row, col] = selectedCell;
    if (solution[row][col] !== 0) return; // Can't change filled cells
    
    const newBoard = board.map(r => [...r]);
    
    if (num === 0) {
      newBoard[row][col] = 0;
    } else if (solution[row][col] === num) {
      newBoard[row][col] = num;
    } else {
      setErrors(errors + 1);
      return;
    }
    
    setBoard(newBoard);
    
    // Check if game is won
    if (isBoardComplete(newBoard)) {
      setGameWon(true);
      const endTime = Date.now();
      const gameTime = Math.floor((endTime - startTime) / 1000);
      const score = Math.max(2000 - errors * 50 - gameTime, 500);
      onGameEnd(score, gameTime);
    }
  };

  const isBoardComplete = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) return false;
      }
    }
    return true;
  };

  const resetGame = () => {
    setBoard([]);
    setSolution([]);
    setGameStarted(false);
    setGameWon(false);
    setSelectedCell(null);
    setStartTime(null);
    setErrors(0);
  };

  const getCellClass = (row, col, value) => {
    let className = 'sudoku-cell';
    
    if (selectedCell && selectedCell[0] === row && selectedCell[1] === col) {
      className += ' selected';
    }
    
    if (solution[row] && solution[row][col] !== 0 && value === 0) {
      className += ' empty';
    } else if (solution[row] && solution[row][col] !== 0 && value !== 0) {
      className += ' filled';
    } else if (value !== 0) {
      className += ' user-input';
    }
    
    // Add border classes for 3x3 boxes
    if (row % 3 === 2 && row < 8) className += ' bottom-border';
    if (col % 3 === 2 && col < 8) className += ' right-border';
    
    return className;
  };

  return (
    <div className="sudoku-game">
      <div className="game-header">
        <h3>🔢 Sudoku Puzzle</h3>
        <div className="game-info">
          {gameStarted && (
            <>
              <span>Errors: {errors}</span>
              <span>Time: {startTime ? Math.floor((Date.now() - startTime) / 1000) : 0}s</span>
            </>
          )}
        </div>
      </div>

      <div className="difficulty-section">
        <label>Difficulty: </label>
        <select 
          value={difficulty} 
          onChange={(e) => setDifficulty(e.target.value)}
          disabled={gameStarted && !gameWon}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="game-controls">
        <button 
          className="game-button" 
          onClick={startGame}
        >
          {gameStarted && !gameWon ? 'New Game' : 'Start Game'}
        </button>
        <button className="game-button secondary" onClick={resetGame}>
          Reset
        </button>
      </div>

      {gameStarted && (
        <>
          <div className="sudoku-board">
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={getCellClass(rowIndex, colIndex, cell)}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                >
                  {cell !== 0 ? cell : ''}
                </div>
              ))
            )}
          </div>

          <div className="number-input">
            <div className="number-buttons">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button
                  key={num}
                  className="number-button"
                  onClick={() => handleNumberInput(num)}
                >
                  {num}
                </button>
              ))}
              <button
                className="number-button clear"
                onClick={() => handleNumberInput(0)}
              >
                Clear
              </button>
            </div>
          </div>
        </>
      )}

      {gameWon && (
        <div className="game-won">
          <h3>🎉 Congratulations!</h3>
          <p>You solved the puzzle!</p>
          <p>Errors: {errors} | Time: {Math.floor((Date.now() - startTime) / 1000)}s</p>
        </div>
      )}

      <div className="game-instructions">
        <p>🎯 Fill the 9×9 grid so each row, column, and 3×3 box contains digits 1-9</p>
        <p>🔢 Click a cell to select it, then click a number to fill it</p>
        <p>🏆 Complete with fewer errors for a higher score!</p>
      </div>
    </div>
  );
};

export default SudokuGame;
