import React, { useState, useEffect } from 'react';
import './MathQuizGame.css';

const MathQuizGame = ({ onGameEnd }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [maxRounds] = useState(20);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [streak, setStreak] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');

  const generateQuestion = () => {
    let question = {};
    
    switch (difficulty) {
      case 'easy':
        question = generateEasyQuestion();
        break;
      case 'medium':
        question = generateMediumQuestion();
        break;
      case 'hard':
        question = generateHardQuestion();
        break;
      default:
        question = generateEasyQuestion();
    }
    
    setCurrentQuestion(question);
    setUserAnswer('');
  };

  const generateEasyQuestion = () => {
    const operations = ['+', '-', '×'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let num1, num2, answer, questionText;
    
    switch (operation) {
      case '+':
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
        answer = num1 + num2;
        questionText = `${num1} + ${num2}`;
        break;
      case '-':
        num1 = Math.floor(Math.random() * 50) + 20;
        num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
        answer = num1 - num2;
        questionText = `${num1} - ${num2}`;
        break;
      case '×':
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
        answer = num1 * num2;
        questionText = `${num1} × ${num2}`;
        break;
      default:
        num1 = 1; num2 = 1; answer = 2; questionText = '1 + 1';
    }
    
    return { question: questionText, answer, difficulty: 'easy' };
  };

  const generateMediumQuestion = () => {
    const operations = ['+', '-', '×', '÷'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let num1, num2, answer, questionText;
    
    switch (operation) {
      case '+':
        num1 = Math.floor(Math.random() * 200) + 50;
        num2 = Math.floor(Math.random() * 200) + 50;
        answer = num1 + num2;
        questionText = `${num1} + ${num2}`;
        break;
      case '-':
        num1 = Math.floor(Math.random() * 300) + 100;
        num2 = Math.floor(Math.random() * (num1 - 50)) + 1;
        answer = num1 - num2;
        questionText = `${num1} - ${num2}`;
        break;
      case '×':
        num1 = Math.floor(Math.random() * 25) + 10;
        num2 = Math.floor(Math.random() * 15) + 5;
        answer = num1 * num2;
        questionText = `${num1} × ${num2}`;
        break;
      case '÷':
        num2 = Math.floor(Math.random() * 15) + 2;
        answer = Math.floor(Math.random() * 20) + 5;
        num1 = num2 * answer;
        questionText = `${num1} ÷ ${num2}`;
        break;
      default:
        num1 = 10; num2 = 5; answer = 15; questionText = '10 + 5';
    }
    
    return { question: questionText, answer, difficulty: 'medium' };
  };

  const generateHardQuestion = () => {
    const questionTypes = ['squares', 'cubes', 'percentages', 'fractions', 'mixed'];
    const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    
    let question, answer, questionText;
    
    switch (type) {
      case 'squares':
        const num = Math.floor(Math.random() * 20) + 1;
        answer = num * num;
        questionText = `${num}²`;
        break;
      case 'cubes':
        const cubeNum = Math.floor(Math.random() * 10) + 1;
        answer = cubeNum * cubeNum * cubeNum;
        questionText = `${cubeNum}³`;
        break;
      case 'percentages':
        const percent = (Math.floor(Math.random() * 9) + 1) * 10; // 10, 20, 30, etc.
        const total = Math.floor(Math.random() * 200) + 50;
        answer = (percent / 100) * total;
        questionText = `${percent}% of ${total}`;
        break;
      case 'fractions':
        const numerator = Math.floor(Math.random() * 9) + 1;
        const denominator = Math.floor(Math.random() * 9) + 2;
        const whole = Math.floor(Math.random() * 100) + 20;
        answer = Math.round((numerator / denominator) * whole);
        questionText = `${numerator}/${denominator} of ${whole}`;
        break;
      case 'mixed':
        const a = Math.floor(Math.random() * 20) + 10;
        const b = Math.floor(Math.random() * 15) + 5;
        const c = Math.floor(Math.random() * 10) + 3;
        answer = a * b + c;
        questionText = `${a} × ${b} + ${c}`;
        break;
      default:
        answer = 25;
        questionText = '5²';
    }
    
    return { question: questionText, answer, difficulty: 'hard' };
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setCurrentRound(1);
    setTimeLeft(difficulty === 'easy' ? 90 : difficulty === 'medium' ? 120 : 150);
    setGameWon(false);
    setGameOver(false);
    setStartTime(Date.now());
    setStreak(0);
    setFeedback('');
    generateQuestion();
  };

  const submitAnswer = () => {
    if (!userAnswer.trim() || gameOver || gameWon || !currentQuestion) return;

    const userNum = parseFloat(userAnswer);
    
    if (Math.abs(userNum - currentQuestion.answer) < 0.01) { // Allow small floating point errors
      // Correct answer
      const baseScore = difficulty === 'easy' ? 50 : difficulty === 'medium' ? 100 : 150;
      const streakBonus = streak * 20;
      const timeBonus = Math.floor(timeLeft / 5);
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
          generateQuestion();
          setFeedback('');
        }, 1000);
      }
    } else {
      // Wrong answer
      setStreak(0);
      setFeedback(`❌ Wrong! The correct answer was ${currentQuestion.answer}`);
      setTimeLeft(prev => Math.max(prev - 5, 0));
      
      setTimeout(() => {
        if (currentRound >= maxRounds) {
          setGameWon(true);
          setGameOver(true);
          const endTime = Date.now();
          const gameTime = Math.floor((endTime - startTime) / 1000);
          onGameEnd(score, gameTime);
        } else {
          setCurrentRound(prev => prev + 1);
          generateQuestion();
          setFeedback('');
        }
      }, 1500);
    }
  };

  const skipQuestion = () => {
    if (gameOver || gameWon) return;
    
    setStreak(0);
    setFeedback(`⏭️ Skipped! The answer was ${currentQuestion.answer}`);
    setTimeLeft(prev => Math.max(prev - 8, 0));
    
    setTimeout(() => {
      if (currentRound >= maxRounds) {
        setGameWon(true);
        setGameOver(true);
        const endTime = Date.now();
        const gameTime = Math.floor((endTime - startTime) / 1000);
        onGameEnd(score, gameTime);
      } else {
        setCurrentRound(prev => prev + 1);
        generateQuestion();
        setFeedback('');
      }
    }, 1500);
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentQuestion(null);
    setUserAnswer('');
    setScore(0);
    setCurrentRound(1);
    setTimeLeft(60);
    setGameWon(false);
    setGameOver(false);
    setStartTime(null);
    setFeedback('');
    setStreak(0);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      submitAnswer();
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

  return (
    <div className="math-quiz-game">
      <div className="game-header">
        <h3>➕ Math Quiz</h3>
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
          <option value="easy">Easy (Basic Operations)</option>
          <option value="medium">Medium (Larger Numbers)</option>
          <option value="hard">Hard (Advanced Math)</option>
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

      {gameStarted && !gameOver && !gameWon && currentQuestion && (
        <div className="game-area">
          <div className="question-section">
            <div className="math-question">
              {currentQuestion.question} = ?
            </div>
          </div>

          <div className="input-section">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your answer"
              className="answer-input"
              step="any"
            />
            <div className="action-buttons">
              <button 
                className="submit-button" 
                onClick={submitAnswer}
                disabled={!userAnswer.trim()}
              >
                Submit
              </button>
              <button className="skip-button" onClick={skipQuestion}>
                Skip (-8s)
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
          <h3>🎉 Mathematical Genius!</h3>
          <p>You completed all {maxRounds} questions!</p>
          <p>Final Score: {score}</p>
          <p>Best Streak: {streak}</p>
          <p>Time: {Math.floor((Date.now() - startTime) / 1000)}s</p>
        </div>
      )}

      {gameOver && !gameWon && (
        <div className="game-result lost">
          <h3>⏰ Time's Up!</h3>
          <p>You answered {currentRound - 1} questions</p>
          <p>Final Score: {score}</p>
          <p>Best Streak: {streak}</p>
        </div>
      )}

      <div className="game-instructions">
        <p>➕ Solve math problems as quickly as possible</p>
        <p>🔥 Build streaks for bonus points</p>
        <p>❌ Wrong answers cost 5 seconds, skipping costs 8 seconds</p>
        <p>🏆 Complete all questions to win!</p>
      </div>
    </div>
  );
};

export default MathQuizGame;
