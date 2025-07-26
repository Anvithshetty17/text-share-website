import React, { useState, useEffect } from 'react';
import './WordScrambleGame.css';

const WordScrambleGame = ({ onGameEnd }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [userGuess, setUserGuess] = useState('');
  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [maxRounds] = useState(10);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [difficulty, setDifficulty] = useState('easy');

  const wordLists = {
    easy: [
      'CAT', 'DOG', 'SUN', 'MOON', 'STAR', 'FISH', 'BIRD', 'TREE', 'BOOK', 'GAME',
      'LOVE', 'HOPE', 'TIME', 'LIFE', 'PLAY', 'WORK', 'HOME', 'FOOD', 'WATER', 'HAPPY'
    ],
    medium: [
      'COMPUTER', 'ELEPHANT', 'MOUNTAIN', 'OCEAN', 'RAINBOW', 'BUTTERFLY', 'KEYBOARD', 'MONSTER',
      'ADVENTURE', 'CHOCOLATE', 'BIRTHDAY', 'WEATHER', 'STUDENT', 'TEACHER', 'PICTURE', 'ANIMAL',
      'SCIENCE', 'HISTORY', 'NATURE', 'JOURNEY'
    ],
    hard: [
      'EXTRAORDINARY', 'MATHEMATICS', 'PHILOSOPHY', 'ENCYCLOPEDIA', 'REFRIGERATOR', 'GYMNASIUM',
      'MICROSCOPE', 'CONSTELLATION', 'ARCHITECTURE', 'PHOTOGRAPHY', 'DEVELOPMENT', 'UNDERSTANDING',
      'ORGANIZATION', 'RESPONSIBILITY', 'COMMUNICATION', 'INTERNATIONAL', 'REVOLUTIONARY', 'TRANSFORMATION',
      'SOPHISTICATED', 'DETERMINATION'
    ]
  };

  const scrambleWord = (word) => {
    const letters = word.split('');
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters.join('');
  };

  const getNewWord = () => {
    const words = wordLists[difficulty];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    let scrambled = scrambleWord(randomWord);
    
    // Make sure scrambled word is different from original
    while (scrambled === randomWord && randomWord.length > 2) {
      scrambled = scrambleWord(randomWord);
    }
    
    setCurrentWord(randomWord);
    setScrambledWord(scrambled);
    setUserGuess('');
    setFeedback('');
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setCurrentRound(1);
    setTimeLeft(difficulty === 'easy' ? 90 : difficulty === 'medium' ? 120 : 150);
    setGameWon(false);
    setGameOver(false);
    setStartTime(Date.now());
    getNewWord();
  };

  const submitGuess = () => {
    if (!userGuess.trim() || gameOver || gameWon) return;

    if (userGuess.toUpperCase() === currentWord) {
      // Correct answer
      const roundScore = difficulty === 'easy' ? 100 : difficulty === 'medium' ? 150 : 200;
      const timeBonus = Math.floor(timeLeft / 2);
      const totalRoundScore = roundScore + timeBonus;
      
      setScore(prev => prev + totalRoundScore);
      setFeedback(`✅ Correct! +${totalRoundScore} points`);
      
      if (currentRound >= maxRounds) {
        // Game won
        setTimeout(() => {
          setGameWon(true);
          setGameOver(true);
          const endTime = Date.now();
          const gameTime = Math.floor((endTime - startTime) / 1000);
          onGameEnd(score + totalRoundScore, gameTime);
        }, 1500);
      } else {
        // Next round
        setTimeout(() => {
          setCurrentRound(prev => prev + 1);
          getNewWord();
        }, 1500);
      }
    } else {
      // Wrong answer
      setFeedback('❌ Try again!');
      setTimeLeft(prev => Math.max(prev - 5, 0));
    }
  };

  const skipWord = () => {
    if (gameOver || gameWon) return;
    
    setFeedback(`⏭️ Skipped! The word was: ${currentWord}`);
    setTimeLeft(prev => Math.max(prev - 10, 0));
    
    if (currentRound >= maxRounds) {
      setTimeout(() => {
        setGameWon(true);
        setGameOver(true);
        const endTime = Date.now();
        const gameTime = Math.floor((endTime - startTime) / 1000);
        onGameEnd(score, gameTime);
      }, 1500);
    } else {
      setTimeout(() => {
        setCurrentRound(prev => prev + 1);
        getNewWord();
      }, 1500);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentWord('');
    setScrambledWord('');
    setUserGuess('');
    setScore(0);
    setCurrentRound(1);
    setTimeLeft(60);
    setGameWon(false);
    setGameOver(false);
    setStartTime(null);
    setFeedback('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      submitGuess();
    }
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

  const getHint = () => {
    const hintLength = Math.floor(currentWord.length / 3);
    return currentWord.substring(0, hintLength) + '...';
  };

  return (
    <div className="word-scramble-game">
      <div className="game-header">
        <h3>🔤 Word Scramble</h3>
        <div className="game-info">
          {gameStarted && (
            <>
              <span>Round: {currentRound}/{maxRounds}</span>
              <span>Score: {score}</span>
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
          <option value="easy">Easy (3-5 letters)</option>
          <option value="medium">Medium (6-9 letters)</option>
          <option value="hard">Hard (10+ letters)</option>
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
          <div className="scrambled-word">
            <h2>{scrambledWord}</h2>
            <p className="hint">Hint: {getHint()}</p>
          </div>

          <div className="input-section">
            <input
              type="text"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter the unscrambled word"
              className="word-input"
            />
            <div className="action-buttons">
              <button 
                className="guess-button" 
                onClick={submitGuess}
                disabled={!userGuess.trim()}
              >
                Submit
              </button>
              <button className="skip-button" onClick={skipWord}>
                Skip (-10s)
              </button>
            </div>
          </div>

          {feedback && (
            <div className={`feedback ${feedback.includes('✅') ? 'correct' : feedback.includes('❌') ? 'wrong' : 'skip'}`}>
              {feedback}
            </div>
          )}
        </div>
      )}

      {gameWon && (
        <div className="game-result won">
          <h3>🎉 Congratulations!</h3>
          <p>You completed all {maxRounds} rounds!</p>
          <p>Final Score: {score}</p>
          <p>Time: {Math.floor((Date.now() - startTime) / 1000)}s</p>
        </div>
      )}

      {gameOver && !gameWon && (
        <div className="game-result lost">
          <h3>⏰ Time's Up!</h3>
          <p>You completed {currentRound - 1} rounds</p>
          <p>Final Score: {score}</p>
        </div>
      )}

      <div className="game-instructions">
        <p>🔤 Unscramble the letters to form the correct word</p>
        <p>💡 Use the hint if you're stuck</p>
        <p>⏰ Wrong answers cost 5 seconds, skipping costs 10 seconds</p>
        <p>🏆 Complete all rounds to win!</p>
      </div>
    </div>
  );
};

export default WordScrambleGame;
