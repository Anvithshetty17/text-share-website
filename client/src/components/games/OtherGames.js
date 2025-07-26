import React, { useState } from 'react';

// Placeholder game components
const SudokuGame = ({ onGameEnd }) => (
  <div style={{ textAlign: 'center', padding: '40px' }}>
    <h3>🔢 Sudoku Game</h3>
    <p>Coming Soon! This will be a full 9x9 Sudoku puzzle game.</p>
    <button className="game-button" onClick={() => onGameEnd(500, 120)}>
      Demo Complete
    </button>
  </div>
);

const FindTheOddGame = ({ onGameEnd }) => (
  <div style={{ textAlign: 'center', padding: '40px' }}>
    <h3>👁️ Find the Odd One</h3>
    <p>Coming Soon! Find the different item among similar ones.</p>
    <button className="game-button" onClick={() => onGameEnd(300, 45)}>
      Demo Complete
    </button>
  </div>
);

const WordScrambleGame = ({ onGameEnd }) => (
  <div style={{ textAlign: 'center', padding: '40px' }}>
    <h3>🔤 Word Scramble</h3>
    <p>Coming Soon! Unscramble letters to form words.</p>
    <button className="game-button" onClick={() => onGameEnd(400, 80)}>
      Demo Complete
    </button>
  </div>
);

const ColorMatchGame = ({ onGameEnd }) => (
  <div style={{ textAlign: 'center', padding: '40px' }}>
    <h3>🎨 Color Match</h3>
    <p>Coming Soon! Match colors as fast as you can.</p>
    <button className="game-button" onClick={() => onGameEnd(350, 60)}>
      Demo Complete
    </button>
  </div>
);

const MathQuizGame = ({ onGameEnd }) => (
  <div style={{ textAlign: 'center', padding: '40px' }}>
    <h3>➕ Math Quiz</h3>
    <p>Coming Soon! Solve math problems quickly.</p>
    <button className="game-button" onClick={() => onGameEnd(450, 90)}>
      Demo Complete
    </button>
  </div>
);

const ReactionTimeGame = ({ onGameEnd }) => {
  const [gameState, setGameState] = useState('waiting'); // waiting, ready, go, result
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);

  const startTest = () => {
    setGameState('ready');
    const delay = Math.random() * 3000 + 2000; // 2-5 seconds
    
    setTimeout(() => {
      setGameState('go');
      setStartTime(Date.now());
    }, delay);
  };

  const handleClick = () => {
    if (gameState === 'go') {
      const endTime = Date.now();
      const reaction = endTime - startTime;
      setReactionTime(reaction);
      setGameState('result');
      
      const score = Math.max(1000 - reaction, 100);
      onGameEnd(score, 1);
    } else if (gameState === 'ready') {
      setGameState('waiting');
      alert('Too early! Wait for the green signal.');
    }
  };

  const reset = () => {
    setGameState('waiting');
    setStartTime(null);
    setReactionTime(null);
  };

  const getBackgroundColor = () => {
    switch (gameState) {
      case 'ready': return '#ef4444';
      case 'go': return '#10b981';
      default: return '#f3f4f6';
    }
  };

  const getMessage = () => {
    switch (gameState) {
      case 'waiting': return 'Click "Start Test" to begin';
      case 'ready': return 'Wait for GREEN...';
      case 'go': return 'CLICK NOW!';
      case 'result': return `Your reaction time: ${reactionTime}ms`;
      default: return '';
    }
  };

  return (
    <div style={{ textAlign: 'center', maxWidth: '400px', margin: '0 auto' }}>
      <h3>⚡ Reaction Time Test</h3>
      
      <div 
        style={{
          backgroundColor: getBackgroundColor(),
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '20px 0',
          borderRadius: '12px',
          cursor: gameState === 'go' || gameState === 'ready' ? 'pointer' : 'default',
          transition: 'background-color 0.3s',
          color: gameState === 'ready' || gameState === 'go' ? 'white' : '#374151',
          fontSize: '1.2rem',
          fontWeight: 'bold'
        }}
        onClick={handleClick}
      >
        {getMessage()}
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        {gameState === 'waiting' && (
          <button className="game-button" onClick={startTest}>
            Start Test
          </button>
        )}
        {gameState === 'result' && (
          <button className="game-button" onClick={reset}>
            Try Again
          </button>
        )}
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#f0fdf4', borderRadius: '8px', color: '#166534' }}>
        <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>🎯 Wait for the green signal, then click as fast as you can!</p>
        <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>⚡ Average human reaction time is 200-300ms</p>
      </div>
    </div>
  );
};

export {
  SudokuGame,
  FindTheOddGame,
  WordScrambleGame,
  ColorMatchGame,
  MathQuizGame,
  ReactionTimeGame
};
