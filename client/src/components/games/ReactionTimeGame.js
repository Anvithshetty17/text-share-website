import React, { useState, useEffect } from 'react';
import './ReactionTimeGame.css';

const ReactionTimeGame = ({ onGameEnd }) => {
  const [gameState, setGameState] = useState('waiting'); // waiting, ready, go, result, gameOver
  const [startTime, setStartTime] = useState(null);
  const [reactionTimes, setReactionTimes] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [maxRounds] = useState(5);
  const [gameWon, setGameWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [bestTime, setBestTime] = useState(null);
  const [averageTime, setAverageTime] = useState(null);

  const startTest = () => {
    if (currentRound === 1) {
      setGameStarted(true);
      setReactionTimes([]);
      setBestTime(null);
      setAverageTime(null);
    }
    
    setGameState('ready');
    const delay = Math.random() * 4000 + 2000; // 2-6 seconds
    
    setTimeout(() => {
      if (gameState !== 'waiting') { // Check if game wasn't reset
        setGameState('go');
        setStartTime(Date.now());
      }
    }, delay);
  };

  const handleClick = () => {
    if (gameState === 'go') {
      const endTime = Date.now();
      const reaction = endTime - startTime;
      
      const newReactionTimes = [...reactionTimes, reaction];
      setReactionTimes(newReactionTimes);
      setGameState('result');
      
      // Calculate statistics
      const newBest = Math.min(...newReactionTimes);
      const newAverage = newReactionTimes.reduce((a, b) => a + b, 0) / newReactionTimes.length;
      setBestTime(newBest);
      setAverageTime(newAverage);
      
      if (currentRound >= maxRounds) {
        // Game completed
        setGameWon(true);
        setGameState('gameOver');
        
        // Calculate score based on average reaction time
        const score = Math.max(2000 - Math.floor(newAverage), 200);
        onGameEnd(score, maxRounds);
      }
    } else if (gameState === 'ready') {
      // Too early click
      setGameState('waiting');
      setReactionTimes(prev => [...prev, -1]); // Mark as failed attempt
      
      if (currentRound >= maxRounds) {
        setGameWon(true);
        setGameState('gameOver');
        const validTimes = reactionTimes.filter(time => time > 0);
        const finalAverage = validTimes.length > 0 ? validTimes.reduce((a, b) => a + b, 0) / validTimes.length : 1000;
        const score = Math.max(2000 - Math.floor(finalAverage), 200);
        onGameEnd(score, maxRounds);
      }
    }
  };

  const nextRound = () => {
    if (currentRound < maxRounds) {
      setCurrentRound(prev => prev + 1);
      setGameState('waiting');
    }
  };

  const resetGame = () => {
    setGameState('waiting');
    setStartTime(null);
    setReactionTimes([]);
    setCurrentRound(1);
    setGameWon(false);
    setGameStarted(false);
    setBestTime(null);
    setAverageTime(null);
  };

  const getBackgroundColor = () => {
    switch (gameState) {
      case 'ready': return '#ef4444';
      case 'go': return '#10b981';
      case 'result': return '#3b82f6';
      case 'gameOver': return '#8b5cf6';
      default: return '#f3f4f6';
    }
  };

  const getMessage = () => {
    switch (gameState) {
      case 'waiting': 
        return gameStarted ? 
          `Round ${currentRound}/${maxRounds} - Click "Start Test" to begin` : 
          'Click "Start Test" to begin';
      case 'ready': return 'Wait for GREEN...';
      case 'go': return 'CLICK NOW!';
      case 'result': 
        const lastTime = reactionTimes[reactionTimes.length - 1];
        return lastTime === -1 ? 
          'Too early! Wait for green next time.' : 
          `Your reaction time: ${lastTime}ms`;
      case 'gameOver': 
        const validTimes = reactionTimes.filter(time => time > 0);
        return validTimes.length > 0 ? 
          `Game Complete! Average: ${Math.round(averageTime)}ms` : 
          'Game Complete! No valid times recorded.';
      default: return '';
    }
  };

  const getQualityRating = (time) => {
    if (time < 200) return { rating: 'Superhuman! 🚀', color: '#10b981' };
    if (time < 250) return { rating: 'Excellent! ⚡', color: '#059669' };
    if (time < 300) return { rating: 'Good! 👍', color: '#3b82f6' };
    if (time < 400) return { rating: 'Average 😐', color: '#f59e0b' };
    return { rating: 'Slow 🐌', color: '#ef4444' };
  };

  return (
    <div className="reaction-time-game">
      <div className="game-header">
        <h3>⚡ Reaction Time Test</h3>
        <div className="game-info">
          {gameStarted && (
            <>
              <span>Round: {currentRound}/{maxRounds}</span>
              {bestTime && <span>Best: {bestTime}ms</span>}
              {averageTime && <span>Avg: {Math.round(averageTime)}ms</span>}
            </>
          )}
        </div>
      </div>

      <div className="game-controls">
        {!gameStarted && (
          <button className="game-button" onClick={startTest}>
            Start Test
          </button>
        )}
        <button className="game-button secondary" onClick={resetGame}>
          Reset
        </button>
      </div>

      <div 
        className="reaction-area"
        style={{
          backgroundColor: getBackgroundColor(),
          cursor: gameState === 'go' || gameState === 'ready' ? 'pointer' : 'default',
        }}
        onClick={handleClick}
      >
        <div className="reaction-message">
          {getMessage()}
        </div>
        
        {gameState === 'result' && reactionTimes[reactionTimes.length - 1] > 0 && (
          <div className="time-rating" style={{ color: getQualityRating(reactionTimes[reactionTimes.length - 1]).color }}>
            {getQualityRating(reactionTimes[reactionTimes.length - 1]).rating}
          </div>
        )}
      </div>

      {gameState === 'result' && currentRound < maxRounds && (
        <div className="next-round">
          <button className="game-button" onClick={nextRound}>
            Next Round ({currentRound + 1}/{maxRounds})
          </button>
        </div>
      )}

      {reactionTimes.length > 0 && (
        <div className="results-section">
          <h4>📊 Results</h4>
          <div className="times-grid">
            {reactionTimes.map((time, index) => (
              <div key={index} className={`time-result ${time === -1 ? 'failed' : ''}`}>
                <span className="round-number">#{index + 1}</span>
                <span className="time-value">
                  {time === -1 ? 'Too Early!' : `${time}ms`}
                </span>
                {time > 0 && (
                  <span className="time-rating-small" style={{ color: getQualityRating(time).color }}>
                    {getQualityRating(time).rating}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {gameWon && (
        <div className="game-result">
          <h3>🏁 Test Complete!</h3>
          {averageTime && (
            <>
              <p>Average Reaction Time: {Math.round(averageTime)}ms</p>
              <p style={{ color: getQualityRating(averageTime).color }}>
                {getQualityRating(averageTime).rating}
              </p>
            </>
          )}
          {bestTime && <p>Best Time: {bestTime}ms</p>}
          <p>Valid Attempts: {reactionTimes.filter(time => time > 0).length}/{maxRounds}</p>
        </div>
      )}

      <div className="game-instructions">
        <p>🎯 Wait for the green signal, then click as fast as you can!</p>
        <p>⚡ Average human reaction time is 200-300ms</p>
        <p>🚫 Clicking on red will count as a failed attempt</p>
        <p>🏆 Complete 5 rounds for your final score!</p>
      </div>

      <div className="reaction-tips">
        <h4>💡 Tips for Better Reaction Times:</h4>
        <ul>
          <li>Stay focused and relaxed</li>
          <li>Use your dominant hand</li>
          <li>Position your finger close to the click area</li>
          <li>Don't try to predict - just react!</li>
        </ul>
      </div>
    </div>
  );
};

export default ReactionTimeGame;
