import React, { useState, useEffect, useCallback } from 'react';
import BannerAdBox from "../BannerAdBox";
const SnakeGame = ({ onGameEnd }) => {
  const BOARD_SIZE = 20;
  const INITIAL_SNAKE = [{ x: 10, y: 10 }];
  const INITIAL_DIRECTION = { x: 0, y: -1 };
  const INITIAL_FOOD = { x: 15, y: 15 };

  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);

  const generateFood = useCallback(() => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE)
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  const moveSnake = useCallback(() => {
    if (!gameStarted || gameOver) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };
      
      head.x += direction.x;
      head.y += direction.y;

      // Check wall collision
      if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
        setGameOver(true);
        const endTime = Date.now();
        const gameTime = Math.floor((endTime - startTime) / 1000);
        onGameEnd(score, gameTime);
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        const endTime = Date.now();
        const gameTime = Math.floor((endTime - startTime) / 1000);
        onGameEnd(score, gameTime);
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameStarted, gameOver, score, startTime, onGameEnd, generateFood]);

  const handleKeyPress = useCallback((e) => {
    if (!gameStarted || gameOver) return;

    switch (e.key) {
      case 'ArrowUp':
        if (direction.y === 0) setDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        if (direction.y === 0) setDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
        if (direction.x === 0) setDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
        if (direction.x === 0) setDirection({ x: 1, y: 0 });
        break;
      default:
        break;
    }
  }, [direction, gameStarted, gameOver]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, 150);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(INITIAL_FOOD);
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setStartTime(Date.now());
  };

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(INITIAL_FOOD);
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setStartTime(null);
  };

  const renderBoard = () => {
    const board = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        let cellClass = 'snake-cell';
        
        if (snake.some(segment => segment.x === col && segment.y === row)) {
          cellClass += ' snake-body';
          if (snake[0].x === col && snake[0].y === row) {
            cellClass += ' snake-head';
          }
        } else if (food.x === col && food.y === row) {
          cellClass += ' food';
        }

        board.push(
          <div
            key={`${row}-${col}`}
            className={cellClass}
          />
        );
      }
    }
    return board;
  };

  return (
    <div className="snake-game">
    <BannerAdBox />
      <div className="game-info">
        <div className="game-score">Score: {score}</div>
        <div className="game-controls">
          {!gameStarted ? (
            <button className="game-button" onClick={startGame}>
              Start Game
            </button>
          ) : (
            <button className="game-button" onClick={resetGame}>
              Reset Game
            </button>
          )}
        </div>
      </div>

      <div className="snake-board">
        {renderBoard()}
      </div>

      <div className="game-instructions">
        <p>Use arrow keys to control the snake</p>
        <p>Eat the red food to grow and increase your score</p>
        <p>Don't hit the walls or yourself!</p>
      </div>

      {gameOver && (
        <div className="game-over">
          <h3>Game Over!</h3>
          <p>Final Score: {score}</p>
          <button className="game-button" onClick={resetGame}>
            Play Again
          </button>
        </div>
      )}

      <style jsx>{`
        .snake-game {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .snake-board {
          display: grid;
          grid-template-columns: repeat(${BOARD_SIZE}, 20px);
          grid-template-rows: repeat(${BOARD_SIZE}, 20px);
          gap: 1px;
          background: #e5e7eb;
          padding: 10px;
          border-radius: 8px;
          margin: 20px auto;
          width: fit-content;
        }

        .snake-cell {
          width: 20px;
          height: 20px;
          background: #f9fafb;
        }

        .snake-body {
          background: #10b981 !important;
        }

        .snake-head {
          background: #059669 !important;
          position: relative;
        }

        .snake-head::after {
          content: '👁️';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 12px;
        }

        .food {
          background: #ef4444 !important;
          border-radius: 50%;
          position: relative;
        }

        .food::after {
          content: '🍎';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 12px;
        }

        .game-instructions {
          color: #6b7280;
          margin-top: 20px;
        }

        .game-instructions p {
          margin: 5px 0;
        }
      `}</style>
    </div>
  );
};

export default SnakeGame;
