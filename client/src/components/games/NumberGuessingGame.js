import React, { useState, useEffect } from 'react';
import BannerAdBox from "../BannerAdBox";

const NumberGuessingGame = ({ onGameEnd }) => {
  const [targetNumber, setTargetNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts, setMaxAttempts] = useState(10);
  const [feedback, setFeedback] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [startTime, setStartTime] = useState(null);
  const [guessHistory, setGuessHistory] = useState([]);

  const difficultySettings = {
    easy: { min: 1, max: 50, attempts: 10 },
    medium: { min: 1, max: 100, attempts: 8 },
    hard: { min: 1, max: 200, attempts: 6 }
  };

  const startGame = () => {
    const settings = difficultySettings[difficulty];
    const newTarget = Math.floor(Math.random() * (settings.max - settings.min + 1)) + settings.min;
    
    setTargetNumber(newTarget);
    setAttempts(0);
    setMaxAttempts(settings.attempts);
    setFeedback(`I'm thinking of a number between ${settings.min} and ${settings.max}. You have ${settings.attempts} attempts!`);
    setGameStarted(true);
    setGameWon(false);
    setGameOver(false);
    setGuess('');
    setStartTime(Date.now());
    setGuessHistory([]);
  };

  const makeGuess = () => {
    if (!guess || gameOver || gameWon) return;

    const guessNum = parseInt(guess);
    const newAttempts = attempts + 1;
    const newHistory = [...guessHistory, { guess: guessNum, attempt: newAttempts }];
    
    setAttempts(newAttempts);
    setGuessHistory(newHistory);
    setGuess('');

    if (guessNum === targetNumber) {
      setGameWon(true);
      setGameOver(true);
      setFeedback('🎉 Congratulations! You guessed it right!');
      
      const endTime = Date.now();
      const gameTime = Math.floor((endTime - startTime) / 1000);
      const score = Math.max(1000 - newAttempts * 50 - gameTime, 100);
      onGameEnd(score, gameTime);
    } else if (newAttempts >= maxAttempts) {
      setGameOver(true);
      setFeedback(`😞 Game Over! The number was ${targetNumber}`);
      onGameEnd(0, Math.floor((Date.now() - startTime) / 1000));
    } else {
      const hint = guessNum < targetNumber ? 'higher' : 'lower';
      const remaining = maxAttempts - newAttempts;
      setFeedback(`Try ${hint}! ${remaining} attempts remaining.`);
    }
  };

  const resetGame = () => {
    setTargetNumber(0);
    setGuess('');
    setAttempts(0);
    setFeedback('');
    setGameStarted(false);
    setGameWon(false);
    setGameOver(false);
    setStartTime(null);
    setGuessHistory([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      makeGuess();
    }
  };

  const getHintColor = (guessValue) => {
    const diff = Math.abs(guessValue - targetNumber);
    const settings = difficultySettings[difficulty];
    const range = settings.max - settings.min;
    
    if (diff <= range * 0.05) return '#10b981'; // very close - green
    if (diff <= range * 0.1) return '#f59e0b'; // close - orange
    if (diff <= range * 0.2) return '#ef4444'; // far - red
    return '#6b7280'; // very far - gray
  };

  return (
    <div className="number-guessing-game">
    <BannerAdBox />
      <div className="game-header">
        <h3>🎯 Number Guessing Game</h3>
        <div className="difficulty-section">
          <label>Difficulty: </label>
          <select 
            value={difficulty} 
            onChange={(e) => setDifficulty(e.target.value)}
            disabled={gameStarted && !gameOver}
          >
            <option value="easy">Easy (1-50, 10 attempts)</option>
            <option value="medium">Medium (1-100, 8 attempts)</option>
            <option value="hard">Hard (1-200, 6 attempts)</option>
          </select>
        </div>
      </div>

      <div className="game-controls">
        <button 
          className="game-button" 
          onClick={startGame}
          disabled={gameStarted && !gameOver}
        >
          {gameStarted && !gameOver ? 'Game in Progress' : 'Start New Game'}
        </button>
        <button className="game-button secondary" onClick={resetGame}>
          Reset
        </button>
      </div>

      {gameStarted && (
        <div className="game-area">
          <div className="feedback-section">
            <p className="feedback-text">{feedback}</p>
            {gameStarted && !gameOver && (
              <p className="attempts-counter">
                Attempts: {attempts}/{maxAttempts}
              </p>
            )}
          </div>

          {!gameOver && (
            <div className="input-section">
              <input
                type="number"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your guess"
                min={difficultySettings[difficulty].min}
                max={difficultySettings[difficulty].max}
                className="guess-input"
              />
              <button 
                className="guess-button" 
                onClick={makeGuess}
                disabled={!guess}
              >
                Guess!
              </button>
            </div>
          )}

          {guessHistory.length > 0 && (
            <div className="history-section">
              <h4>📊 Guess History</h4>
              <div className="history-list">
                {guessHistory.map((entry, index) => (
                  <div 
                    key={index} 
                    className="history-item"
                    style={{ color: getHintColor(entry.guess) }}
                  >
                    #{entry.attempt}: {entry.guess}
                    {entry.guess === targetNumber ? ' ✅' : 
                     entry.guess < targetNumber ? ' ⬆️' : ' ⬇️'}
                  </div>
                ))}
              </div>
            </div>
          )}

          {gameOver && (
            <div className={`game-result ${gameWon ? 'won' : 'lost'}`}>
              {gameWon ? (
                <>
                  <h3>🎉 You Won!</h3>
                  <p>You guessed {targetNumber} in {attempts} attempts!</p>
                </>
              ) : (
                <>
                  <h3>😞 Game Over</h3>
                  <p>The number was {targetNumber}</p>
                </>
              )}
              <p>Time: {Math.floor((Date.now() - startTime) / 1000)} seconds</p>
            </div>
          )}
        </div>
      )}

      <div className="game-instructions">
        <p>🎯 Guess the secret number within the given attempts</p>
        <p>⬆️ Higher means the target is bigger than your guess</p>
        <p>⬇️ Lower means the target is smaller than your guess</p>
        <p>🏆 Fewer attempts = higher score!</p>
      </div>

      <style jsx>{`
        .number-guessing-game {
          max-width: 500px;
          margin: 0 auto;
          text-align: center;
        }

        .game-header h3 {
          color: #1f2937;
          margin-bottom: 15px;
        }

        .difficulty-section {
          margin-bottom: 15px;
        }

        .difficulty-section label {
          margin-right: 10px;
          font-weight: 600;
          color: #374151;
        }

        .difficulty-section select {
          padding: 5px 10px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
        }

        .game-controls {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-bottom: 20px;
        }

        .game-area {
          background: #f8fafc;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 20px;
        }

        .feedback-section {
          margin-bottom: 20px;
        }

        .feedback-text {
          font-size: 1.1rem;
          color: #374151;
          margin-bottom: 10px;
          padding: 10px;
          background: white;
          border-radius: 8px;
        }

        .attempts-counter {
          font-weight: 600;
          color: #6b7280;
        }

        .input-section {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-bottom: 20px;
        }

        .guess-input {
          padding: 10px;
          border: 2px solid #d1d5db;
          border-radius: 6px;
          font-size: 1rem;
          width: 150px;
          text-align: center;
        }

        .guess-input:focus {
          outline: none;
          border-color: #3b82f6;
        }

        .guess-button {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.2s;
        }

        .guess-button:hover:not(:disabled) {
          background: #2563eb;
        }

        .guess-button:disabled {
          background: #9ca3af;
          cursor: not-allowed;
        }

        .history-section {
          margin-bottom: 20px;
        }

        .history-section h4 {
          color: #1f2937;
          margin-bottom: 10px;
        }

        .history-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
        }

        .history-item {
          background: white;
          padding: 5px 10px;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 600;
          border: 1px solid #e5e7eb;
        }

        .game-result {
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .game-result.won {
          background: #d1fae5;
          color: #065f46;
        }

        .game-result.lost {
          background: #fee2e2;
          color: #991b1b;
        }

        .game-result h3 {
          margin-bottom: 10px;
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

export default NumberGuessingGame;
