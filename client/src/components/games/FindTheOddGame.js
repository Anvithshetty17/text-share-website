import React, { useState, useEffect } from 'react';
import './FindTheOddGame.css';
import BannerAdBox from "../BannerAdBox";

const FindTheOddGame = ({ onGameEnd }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameItems, setGameItems] = useState([]);
  const [oddItemIndex, setOddItemIndex] = useState(null);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const itemSets = [
    { normal: '🔴', odd: '🔵', name: 'Circles' },
    { normal: '🐶', odd: '🐱', name: 'Animals' },
    { normal: '🍎', odd: '🍌', name: 'Fruits' },
    { normal: '⭐', odd: '❤️', name: 'Shapes' },
    { normal: '🚗', odd: '🚁', name: 'Vehicles' },
    { normal: '🌞', odd: '🌙', name: 'Sky Objects' },
    { normal: '🏠', odd: '🏰', name: 'Buildings' },
    { normal: '⚽', odd: '🏀', name: 'Sports' },
    { normal: '📱', odd: '💻', name: 'Tech' },
    { normal: '🌸', odd: '🌵', name: 'Plants' }
  ];

  const generateLevel = () => {
    const gridSize = Math.min(4 + Math.floor(currentLevel / 3), 8);
    const totalItems = gridSize * gridSize;
    const currentSet = itemSets[(currentLevel - 1) % itemSets.length];
    
    const items = Array(totalItems).fill(currentSet.normal);
    const oddIndex = Math.floor(Math.random() * totalItems);
    items[oddIndex] = currentSet.odd;
    
    setGameItems(items);
    setOddItemIndex(oddIndex);
  };

  const startGame = () => {
    setGameStarted(true);
    setCurrentLevel(1);
    setScore(0);
    setTimeLeft(30);
    setGameWon(false);
    setGameOver(false);
    setStartTime(Date.now());
    generateLevel();
  };

  const handleItemClick = (index) => {
    if (!gameStarted || gameOver || gameWon) return;
    
    if (index === oddItemIndex) {
      // Correct answer
      const levelScore = 100 + (currentLevel * 10);
      setScore(prev => prev + levelScore);
      
      if (currentLevel >= 10) {
        // Game won
        setGameWon(true);
        setGameOver(true);
        const endTime = Date.now();
        const gameTime = Math.floor((endTime - startTime) / 1000);
        onGameEnd(score + levelScore, gameTime);
      } else {
        // Next level
        setCurrentLevel(prev => prev + 1);
        setTimeLeft(prev => Math.min(prev + 5, 45)); // Add time bonus
        setTimeout(generateLevel, 500);
      }
    } else {
      // Wrong answer - lose time
      setTimeLeft(prev => Math.max(prev - 5, 0));
      if (timeLeft <= 5) {
        setGameOver(true);
        const endTime = Date.now();
        const gameTime = Math.floor((endTime - startTime) / 1000);
        onGameEnd(score, gameTime);
      }
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentLevel(1);
    setScore(0);
    setTimeLeft(30);
    setGameItems([]);
    setOddItemIndex(null);
    setGameWon(false);
    setGameOver(false);
    setStartTime(null);
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

  const getGridSize = () => {
    const gridSize = Math.min(4 + Math.floor(currentLevel / 3), 8);
    return gridSize;
  };

  const getItemClass = (index) => {
    let className = 'game-item';
    if (index === oddItemIndex) {
      className += ' odd-item';
    }
    return className;
  };

  return (
    <div className="find-odd-game">
    <BannerAdBox />
      <div className="game-header">
        <h3>👁️ Find the Odd One Out</h3>
        <div className="game-info">
          {gameStarted && (
            <>
              <span>Level: {currentLevel}/10</span>
              <span>Score: {score}</span>
              <span>Time: {timeLeft}s</span>
            </>
          )}
        </div>
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
          <div className="level-info">
            <p>Find the different {itemSets[(currentLevel - 1) % itemSets.length].name.toLowerCase()}!</p>
          </div>
          
          <div 
            className="items-grid"
            style={{
              gridTemplateColumns: `repeat(${getGridSize()}, 1fr)`,
              gridTemplateRows: `repeat(${getGridSize()}, 1fr)`
            }}
          >
            {gameItems.map((item, index) => (
              <div
                key={index}
                className={getItemClass(index)}
                onClick={() => handleItemClick(index)}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      {gameWon && (
        <div className="game-result won">
          <h3>🎉 Excellent!</h3>
          <p>You completed all 10 levels!</p>
          <p>Final Score: {score}</p>
          <p>Time: {Math.floor((Date.now() - startTime) / 1000)}s</p>
        </div>
      )}

      {gameOver && !gameWon && (
        <div className="game-result lost">
          <h3>⏰ Time's Up!</h3>
          <p>You reached level {currentLevel}</p>
          <p>Final Score: {score}</p>
        </div>
      )}

      <div className="game-instructions">
        <p>👁️ Find the item that's different from the others</p>
        <p>⚡ Quick clicks give bonus time</p>
        <p>❌ Wrong clicks reduce your time</p>
        <p>🏆 Complete 10 levels to win!</p>
      </div>
    </div>
  );
};

export default FindTheOddGame;
