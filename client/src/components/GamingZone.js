import React, { useState, useEffect } from 'react';
import SnakeGame from './games/SnakeGame';
import SudokuGame from './games/SudokuGame';
import FindTheOddGame from './games/FindTheOddGame';
import MemoryCardGame from './games/MemoryCardGame';
import TicTacToeGame from './games/TicTacToeGame';
import NumberGuessingGame from './games/NumberGuessingGame';
import WordScrambleGame from './games/WordScrambleGame';
import ColorMatchGame from './games/ColorMatchGame';
import MathQuizGame from './games/MathQuizGame';
import ReactionTimeGame from './games/ReactionTimeGame';
import './styles/GamingZone.css';

const GamingZone = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameStats, setGameStats] = useState({});

  const games = [
    {
      id: 'snake',
      name: 'Snake Game',
      description: 'Classic snake game - eat food and grow longer!',
      icon: '🐍',
      component: SnakeGame,
      difficulty: 'Medium'
    },
    {
      id: 'sudoku',
      name: 'Sudoku',
      description: 'Fill the 9x9 grid with numbers 1-9',
      icon: '🔢',
      component: SudokuGame,
      difficulty: 'Hard'
    },
    {
      id: 'findOdd',
      name: 'Find the Odd One',
      description: 'Spot the different item among similar ones',
      icon: '👁️',
      component: FindTheOddGame,
      difficulty: 'Easy'
    },
    {
      id: 'memory',
      name: 'Memory Cards',
      description: 'Match pairs of cards by remembering their positions',
      icon: '🧠',
      component: MemoryCardGame,
      difficulty: 'Medium'
    },
    {
      id: 'tictactoe',
      name: 'Tic Tac Toe',
      description: 'Classic 3x3 grid game against AI',
      icon: '❌',
      component: TicTacToeGame,
      difficulty: 'Easy'
    },
    {
      id: 'numberGuess',
      name: 'Number Guessing',
      description: 'Guess the secret number with hints',
      icon: '🎯',
      component: NumberGuessingGame,
      difficulty: 'Easy'
    },
    {
      id: 'wordScramble',
      name: 'Word Scramble',
      description: 'Unscramble the letters to form words',
      icon: '🔤',
      component: WordScrambleGame,
      difficulty: 'Medium'
    },
    {
      id: 'colorMatch',
      name: 'Color Match',
      description: 'Match colors as fast as you can',
      icon: '🎨',
      component: ColorMatchGame,
      difficulty: 'Medium'
    },
    {
      id: 'mathQuiz',
      name: 'Math Quiz',
      description: 'Solve math problems quickly',
      icon: '➕',
      component: MathQuizGame,
      difficulty: 'Medium'
    },
    {
      id: 'reactionTime',
      name: 'Reaction Time',
      description: 'Test how fast your reflexes are',
      icon: '⚡',
      component: ReactionTimeGame,
      difficulty: 'Easy'
    }
  ];

  useEffect(() => {
    // Load game statistics from localStorage
    const stats = localStorage.getItem('gameStats');
    if (stats) {
      setGameStats(JSON.parse(stats));
    }
  }, []);

  const updateGameStats = (gameId, score, time) => {
    const newStats = { ...gameStats };
    if (!newStats[gameId]) {
      newStats[gameId] = { 
        gamesPlayed: 0, 
        bestScore: 0, 
        totalTime: 0, 
        lastPlayed: null 
      };
    }
    
    newStats[gameId].gamesPlayed += 1;
    newStats[gameId].bestScore = Math.max(newStats[gameId].bestScore, score);
    newStats[gameId].totalTime += time;
    newStats[gameId].lastPlayed = new Date().toLocaleDateString();
    
    setGameStats(newStats);
    localStorage.setItem('gameStats', JSON.stringify(newStats));
  };

  const renderGameCard = (game) => {
    const stats = gameStats[game.id];
    
    return (
      <div 
        key={game.id} 
        className="game-card"
        onClick={() => setSelectedGame(game)}
      >
        <div className="game-icon">{game.icon}</div>
        <h3>{game.name}</h3>
        <p>{game.description}</p>
        <div className="game-difficulty">
          <span className={`difficulty-badge ${game.difficulty.toLowerCase()}`}>
            {game.difficulty}
          </span>
        </div>
        {stats && (
          <div className="game-stats">
            <small>
              Played: {stats.gamesPlayed} | Best: {stats.bestScore}
            </small>
          </div>
        )}
      </div>
    );
  };

  const renderSelectedGame = () => {
    if (!selectedGame) return null;
    
    const GameComponent = selectedGame.component;
    
    return (
      <div className="game-container">
        <div className="game-header">
          <button 
            className="back-button"
            onClick={() => setSelectedGame(null)}
          >
            ← Back to Games
          </button>
          <h2>{selectedGame.icon} {selectedGame.name}</h2>
        </div>
        <GameComponent 
          onGameEnd={(score, time) => updateGameStats(selectedGame.id, score, time)}
        />
      </div>
    );
  };

  if (selectedGame) {
    return renderSelectedGame();
  }

  return (
    <div className="gaming-zone-container">
      <div className="gaming-zone-header">
        <h1>🎮 Gaming Zone</h1>
        <p>Challenge yourself with our collection of fun and engaging games!</p>
      </div>

      <div className="games-grid">
        {games.map(renderGameCard)}
      </div>

      <div className="gaming-stats-section">
        <h2>📊 Your Gaming Statistics</h2>
        {Object.keys(gameStats).length > 0 ? (
          <div className="stats-grid">
            {Object.entries(gameStats).map(([gameId, stats]) => {
              const game = games.find(g => g.id === gameId);
              if (!game) return null;
              
              return (
                <div key={gameId} className="stat-card">
                  <div className="stat-icon">{game.icon}</div>
                  <h4>{game.name}</h4>
                  <div className="stat-details">
                    <p>Games Played: <strong>{stats.gamesPlayed}</strong></p>
                    <p>Best Score: <strong>{stats.bestScore}</strong></p>
                    <p>Avg Time: <strong>{Math.round(stats.totalTime / stats.gamesPlayed)}s</strong></p>
                    <p>Last Played: <strong>{stats.lastPlayed}</strong></p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no-stats">
            <p>No games played yet. Start playing to see your statistics!</p>
          </div>
        )}
      </div>

      <div className="gaming-tips">
        <h3>🎯 Gaming Tips</h3>
        <ul>
          <li>Start with easier games to build confidence</li>
          <li>Take breaks between games to avoid fatigue</li>
          <li>Challenge yourself with harder difficulties</li>
          <li>Track your progress and try to beat your best scores</li>
          <li>Have fun and don't stress about winning!</li>
        </ul>
      </div>
    </div>
  );
};

export default GamingZone;
