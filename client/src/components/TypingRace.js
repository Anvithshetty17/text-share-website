import React, { useState, useEffect, useRef } from 'react';
import './styles/TypingRace.css';
import AdBanner from "./AdBanner";
import BannerAdBox from "./BannerAdBox";

const TypingRace = () => {
  const [currentText, setCurrentText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errors, setErrors] = useState(0);
  const [difficulty, setDifficulty] = useState('easy');
  const inputRef = useRef(null);

  const textSamples = {
    easy: [
      "The quick brown fox jumps over the lazy dog.",
      "A journey of a thousand miles begins with a single step.",
      "To be or not to be, that is the question.",
      "All that glitters is not gold.",
      "Practice makes perfect."
    ],
    medium: [
      "The world is a book and those who do not travel read only one page. Every moment is a fresh beginning and every sunset is an opportunity to reset.",
      "Technology has become an integral part of our daily lives, transforming the way we communicate, work, and interact with the world around us.",
      "Education is the most powerful weapon which you can use to change the world, and knowledge is the key to unlocking endless possibilities.",
      "Success is not final, failure is not fatal: it is the courage to continue that counts in the long journey of life and personal growth."
    ],
    hard: [
      "Entrepreneurship is neither a science nor an art. It is a practice. It has a knowledge base, of course, which this book attempts to present in an organized fashion.",
      "The philosophical implications of quantum mechanics continue to perplex scientists and philosophers alike, challenging our fundamental understanding of reality, causality, and the nature of observation itself.",
      "Artificial intelligence and machine learning algorithms are revolutionizing industries by enabling computers to process vast amounts of data, recognize patterns, and make decisions with unprecedented speed and accuracy.",
      "Cryptocurrency and blockchain technology represent a paradigmatic shift in how we conceptualize money, trust, and decentralized systems in the digital age."
    ]
  };

  const getRandomText = () => {
    const samples = textSamples[difficulty];
    return samples[Math.floor(Math.random() * samples.length)];
  };

  const startTest = () => {
    const newText = getRandomText();
    setCurrentText(newText);
    setUserInput('');
    setCurrentIndex(0);
    setErrors(0);
    setIsStarted(true);
    setIsFinished(false);
    setStartTime(new Date());
    setEndTime(null);
    setWpm(0);
    setAccuracy(100);
    inputRef.current?.focus();
  };

  const resetTest = () => {
    setCurrentText('');
    setUserInput('');
    setCurrentIndex(0);
    setErrors(0);
    setIsStarted(false);
    setIsFinished(false);
    setStartTime(null);
    setEndTime(null);
    setWpm(0);
    setAccuracy(100);
  };

  const handleInputChange = (e) => {
    if (!isStarted || isFinished) return;

    const value = e.target.value;
    setUserInput(value);
    
    // Count errors
    let errorCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== currentText[i]) {
        errorCount++;
      }
    }
    setErrors(errorCount);
    setCurrentIndex(value.length);
    
    // Calculate accuracy
    const acc = value.length > 0 ? ((value.length - errorCount) / value.length) * 100 : 100;
    setAccuracy(Math.round(acc));

    // Check if test is complete
    if (value === currentText) {
      const end = new Date();
      setEndTime(end);
      setIsFinished(true);
      
      // Calculate WPM
      const timeInMinutes = (end - startTime) / 60000;
      const wordsTyped = currentText.split(' ').length;
      const wpmCalculated = Math.round(wordsTyped / timeInMinutes);
      setWpm(wpmCalculated);
      
      // Save result to localStorage
      saveResult(wpmCalculated, acc, difficulty);
    }
  };

  const saveResult = (wpmScore, accuracyScore, level) => {
    const results = JSON.parse(localStorage.getItem('typingResults') || '[]');
    const newResult = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      wpm: wpmScore,
      accuracy: accuracyScore,
      difficulty: level,
      text: currentText.substring(0, 50) + '...'
    };
    results.unshift(newResult);
    // Keep only last 10 results
    if (results.length > 10) {
      results.splice(10);
    }
    localStorage.setItem('typingResults', JSON.stringify(results));
  };

  const getResults = () => {
    return JSON.parse(localStorage.getItem('typingResults') || '[]');
  };

  const renderText = () => {
    if (!currentText) return null;

    return currentText.split('').map((char, index) => {
      let className = '';
      if (index < userInput.length) {
        className = userInput[index] === char ? 'correct' : 'incorrect';
      } else if (index === userInput.length) {
        className = 'current';
      }
      
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  useEffect(() => {
    if (isStarted && !isFinished && startTime) {
      const interval = setInterval(() => {
        const now = new Date();
        const timeInMinutes = (now - startTime) / 60000;
        const wordsTyped = userInput.split(' ').length;
        if (timeInMinutes > 0) {
          setWpm(Math.round(wordsTyped / timeInMinutes));
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isStarted, isFinished, startTime, userInput]);

  const results = getResults();

  return (
    <div className="typing-race-container">
      <div className="typing-race-header">
        <h1>🏎️ Typing Race</h1>
        <p>Test your typing speed and accuracy!</p>
      </div>

      <div className="typing-race-content">
        <div className="controls-section">
          <div className="difficulty-selector">
            <label>Difficulty: </label>
            <select 
              value={difficulty} 
              onChange={(e) => setDifficulty(e.target.value)}
              disabled={isStarted}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          
          <div className="control-buttons">
            <button onClick={startTest} disabled={isStarted && !isFinished}>
              {isStarted ? 'Test in Progress' : 'Start Test'}
            </button>
            <button onClick={resetTest}>Reset</button>
          </div>
        </div>

        <div className="stats-section">
          <div className="stat">
            <span className="stat-label">WPM:</span>
            <span className="stat-value">{wpm}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Accuracy:</span>
            <span className="stat-value">{accuracy}%</span>
          </div>
          <div className="stat">
            <span className="stat-label">Errors:</span>
            <span className="stat-value">{errors}</span>
          </div>
        </div>
       <AdBanner />
        {currentText && (
          <div className="text-display">
            {renderText()}
          </div>
        )}

        <div className="input-section">
          <textarea
            ref={inputRef}
            value={userInput}
            onChange={handleInputChange}
            placeholder={isStarted ? "Start typing here..." : "Click 'Start Test' to begin"}
            disabled={!isStarted || isFinished}
            rows={4}
          />
        </div>

        {isFinished && (
          <div className="result-section">
            <h3>🎉 Test Complete!</h3>
            <p>Your typing speed: <strong>{wpm} WPM</strong></p>
            <p>Accuracy: <strong>{accuracy}%</strong></p>
            <p>Errors: <strong>{errors}</strong></p>
          </div>
        )}

        <div className="history-section">
          <h3>📊 Previous Results</h3>
          {results.length > 0 ? (
            <div className="results-table">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>WPM</th>
                    <th>Accuracy</th>
                    <th>Difficulty</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result) => (
                    <tr key={result.id}>
                      <td>{result.date}</td>
                      <td>{result.wpm}</td>
                      <td>{result.accuracy}%</td>
                      <td className={`difficulty-${result.difficulty}`}>
                        {result.difficulty}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <BannerAdBox />
          ) : (
            <p>No previous results. Start typing to see your progress!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TypingRace;
