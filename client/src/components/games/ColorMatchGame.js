import React, { useState, useEffect } from 'react';
import './ColorMatchGame.css';

const ColorMatchGame = ({ onGameEnd }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [targetColor, setTargetColor] = useState('');
  const [colorOptions, setColorOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [maxRounds] = useState(15);
  const [timeLeft, setTimeLeft] = useState(45);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [streak, setStreak] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');

  const colorSets = {
    easy: [
      { name: 'Red', color: '#FF0000' },
      { name: 'Blue', color: '#0000FF' },
      { name: 'Green', color: '#00FF00' },
      { name: 'Yellow', color: '#FFFF00' },
      { name: 'Purple', color: '#800080' },
      { name: 'Orange', color: '#FFA500' },
      { name: 'Pink', color: '#FFC0CB' },
      { name: 'Cyan', color: '#00FFFF' }
    ],
    medium: [
      { name: 'Crimson', color: '#DC143C' },
      { name: 'Navy', color: '#000080' },
      { name: 'Forest Green', color: '#228B22' },
      { name: 'Gold', color: '#FFD700' },
      { name: 'Indigo', color: '#4B0082' },
      { name: 'Coral', color: '#FF7F50' },
      { name: 'Turquoise', color: '#40E0D0' },
      { name: 'Violet', color: '#EE82EE' },
      { name: 'Olive', color: '#808000' },
      { name: 'Maroon', color: '#800000' }
    ],
    hard: [
      { name: 'Chartreuse', color: '#7FFF00' },
      { name: 'Periwinkle', color: '#CCCCFF' },
      { name: 'Vermillion', color: '#E34234' },
      { name: 'Teal', color: '#008080' },
      { name: 'Magenta', color: '#FF00FF' },
      { name: 'Aquamarine', color: '#7FFFD4' },
      { name: 'Lavender', color: '#E6E6FA' },
      { name: 'Salmon', color: '#FA8072' },
      { name: 'Khaki', color: '#F0E68C' },
      { name: 'Plum', color: '#DDA0DD' },
      { name: 'Sienna', color: '#A0522D' },
      { name: 'Orchid', color: '#DA70D6' }
    ]
  };

  const generateRound = () => {
    const colors = colorSets[difficulty];
    const targetIndex = Math.floor(Math.random() * colors.length);
    const target = colors[targetIndex];
    
    // Create options (including the correct answer)
    const numOptions = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : 8;
    const options = [target];
    
    // Add wrong options
    while (options.length < numOptions) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      if (!options.find(opt => opt.name === randomColor.name)) {
        options.push(randomColor);
      }
    }
    
    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    
    setTargetColor(target);
    setColorOptions(options);
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setCurrentRound(1);
    setTimeLeft(difficulty === 'easy' ? 60 : difficulty === 'medium' ? 90 : 120);
    setGameWon(false);
    setGameOver(false);
    setStartTime(Date.now());
    setStreak(0);
    setFeedback('');
    generateRound();
  };

  const handleColorClick = (selectedColor) => {
    if (!gameStarted || gameOver || gameWon) return;

    if (selectedColor.name === targetColor.name) {
      // Correct answer
      const baseScore = difficulty === 'easy' ? 50 : difficulty === 'medium' ? 75 : 100;
      const streakBonus = streak * 10;
      const timeBonus = Math.floor(timeLeft / 10);
      const roundScore = baseScore + streakBonus + timeBonus;
      
      setScore(prev => prev + roundScore);
      setStreak(prev => prev + 1);
      setFeedback(`✅ Correct! +${roundScore} points (Streak: ${streak + 1})`);
      
      if (currentRound >= maxRounds) {
        // Game won
        setTimeout(() => {
          setGameWon(true);
          setGameOver(true);
          const endTime = Date.now();
          const gameTime = Math.floor((endTime - startTime) / 1000);
          onGameEnd(score + roundScore, gameTime);
        }, 1000);
      } else {
        // Next round
        setTimeout(() => {
          setCurrentRound(prev => prev + 1);
          generateRound();
          setFeedback('');
        }, 1000);
      }
    } else {
      // Wrong answer
      setStreak(0);
      setFeedback(`❌ Wrong! The correct color was ${targetColor.name}`);
      setTimeLeft(prev => Math.max(prev - 3, 0));
      
      setTimeout(() => {
        if (currentRound >= maxRounds) {
          setGameWon(true);
          setGameOver(true);
          const endTime = Date.now();
          const gameTime = Math.floor((endTime - startTime) / 1000);
          onGameEnd(score, gameTime);
        } else {
          setCurrentRound(prev => prev + 1);
          generateRound();
          setFeedback('');
        }
      }, 1500);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setTargetColor('');
    setColorOptions([]);
    setScore(0);
    setCurrentRound(1);
    setTimeLeft(45);
    setGameWon(false);
    setGameOver(false);
    setStartTime(null);
    setFeedback('');
    setStreak(0);
  };

  useEffect(() => {
    let timer;
    if (gameStarted && !gameOver && !gameWon && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameOver(true);
            const endTime = Date.now();
            const gameTime = Math.floor((endTime - startTime) / 1000);
            onGameEnd(score, gameTime);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [gameStarted, gameOver, gameWon, timeLeft, score, startTime, onGameEnd]);

  return (
    <div className="color-match-game">
      <div className="game-header">
        <h3>🎨 Color Match</h3>
        <div className="game-info">
          {gameStarted && (
            <>
              <span>Round: {currentRound}/{maxRounds}</span>
              <span>Score: {score}</span>
              <span>Streak: {streak}</span>
              <span>Time: {timeLeft}s</span>
            </>
          )}
        </div>
      </div>

      <div className="difficulty-section">
        <label>Difficulty: </label>
        <select 
          value={difficulty} 
          onChange={(e) => setDifficulty(e.target.value)}
          disabled={gameStarted && !gameOver && !gameWon}
        >
          <option value="easy">Easy (Basic Colors)</option>
          <option value="medium">Medium (Named Colors)</option>
          <option value="hard">Hard (Complex Names)</option>
        </select>
      </div>

      <div className="game-controls">
        <button 
          className="game-button" 
          onClick={startGame}
          disabled={gameStarted && !gameOver && !gameWon}
        >
          {gameStarted && !gameOver && !gameWon ? 'Game in Progress' : 'Start Game'}
        </button>
        <button className="game-button secondary" onClick={resetGame}>
          Reset
        </button>
      </div>

      {gameStarted && !gameOver && !gameWon && (
        <div className="game-area">
          <div className="target-section">
            <h4>Find this color:</h4>
            <div className="target-color-name">{targetColor.name}</div>
          </div>

          <div className="color-options">
            {colorOptions.map((color, index) => (
              <div
                key={index}
                className="color-option"
                style={{ backgroundColor: color.color }}
                onClick={() => handleColorClick(color)}
                title={color.name}
              >
                <span className="color-hover-name">{color.name}</span>
              </div>
            ))}
          </div>

          {feedback && (
            <div className={`feedback ${feedback.includes('✅') ? 'correct' : 'wrong'}`}>
              {feedback}
            </div>
          )}
        </div>
      )}

      {gameWon && (
        <div className="game-result won">
          <h3>🎉 Fantastic!</h3>
          <p>You completed all {maxRounds} rounds!</p>
          <p>Final Score: {score}</p>
          <p>Best Streak: {streak}</p>
          <p>Time: {Math.floor((Date.now() - startTime) / 1000)}s</p>
        </div>
      )}

      {gameOver && !gameWon && (
        <div className="game-result lost">
          <h3>⏰ Time's Up!</h3>
          <p>You completed {currentRound - 1} rounds</p>
          <p>Final Score: {score}</p>
          <p>Best Streak: {streak}</p>
        </div>
      )}

      <div className="game-instructions">
        <p>🎨 Click the color that matches the given name</p>
        <p>🔥 Build streaks for bonus points</p>
        <p>❌ Wrong answers cost 3 seconds</p>
        <p>🏆 Complete all rounds to win!</p>
      </div>
    </div>
  );
};

export default ColorMatchGame;
