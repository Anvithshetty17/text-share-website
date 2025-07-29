import React, { useState } from 'react';
import '../App.css';

const AptitudePage = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

  const navItems = [
    { key: 'home', label: 'Home' },
    { key: 'quantitative', label: 'Quantitative Aptitude' },
    { key: 'logical', label: 'Logical Reasoning' },
    { key: 'verbal', label: 'Verbal Ability' },
    { key: 'technical', label: 'Technical MCQs' },
    { key: 'practice', label: 'Practice Tests' },
    { key: 'tips', label: 'Exam Tips' }
  ];

  const quantitativeQuestions = [
    {
      id: 1,
      question: "A train travels 360 km in 4 hours. What is its speed in km/h?",
      options: ["80 km/h", "90 km/h", "100 km/h", "120 km/h"],
      correct: 1,
      explanation: "Speed = Distance / Time = 360 / 4 = 90 km/h"
    },
    {
      id: 2,
      question: "If 20% of a number is 50, what is the number?",
      options: ["200", "250", "300", "350"],
      correct: 1,
      explanation: "Let the number be x. 20% of x = 50, so 0.2x = 50, x = 250"
    },
    {
      id: 3,
      question: "The compound interest on Rs. 8000 at 15% per annum for 2 years is:",
      options: ["Rs. 2520", "Rs. 2580", "Rs. 2640", "Rs. 2700"],
      correct: 1,
      explanation: "CI = P[(1+r/100)^n - 1] = 8000[(1.15)^2 - 1] = 8000[1.3225 - 1] = Rs. 2580"
    }
  ];

  const logicalQuestions = [
    {
      id: 1,
      question: "In a certain code, COMPUTER is written as RFUVQNPC. How is MEDICINE written in that code?",
      options: ["EOJDEJMC", "EOJDJMCE", "EOJDMJCE", "EOJDEMJC"],
      correct: 0,
      explanation: "Each letter is moved 4 positions forward in the alphabet"
    },
    {
      id: 2,
      question: "Find the next number in the series: 2, 6, 12, 20, 30, ?",
      options: ["40", "42", "44", "46"],
      correct: 1,
      explanation: "Pattern: 1×2, 2×3, 3×4, 4×5, 5×6, 6×7 = 42"
    }
  ];

  const verbalQuestions = [
    {
      id: 1,
      question: "Choose the word that is most similar in meaning to 'ABUNDANT':",
      options: ["Scarce", "Plentiful", "Limited", "Insufficient"],
      correct: 1,
      explanation: "Abundant means existing in large quantities; plentiful"
    },
    {
      id: 2,
      question: "Find the correctly spelled word:",
      options: ["Occurence", "Occurrence", "Occurrance", "Occurance"],
      correct: 1,
      explanation: "The correct spelling is 'Occurrence' with double 'r' and double 'c'"
    }
  ];

  const technicalQuestions = [
    {
      id: 1,
      question: "Which of the following is NOT a Java keyword?",
      options: ["static", "void", "main", "string"],
      correct: 3,
      explanation: "'string' is not a keyword in Java. The correct class name is 'String' with capital S"
    },
    {
      id: 2,
      question: "What is the output of: System.out.println(10 + 20 + \"Hello\" + 10 + 20);",
      options: ["1020Hello1020", "30Hello1020", "30Hello30", "102010Hello20"],
      correct: 1,
      explanation: "Left to right evaluation: 10+20=30, then concatenation: '30Hello1020'"
    }
  ];

  const getCurrentQuestions = () => {
    switch (currentSection) {
      case 'quantitative': return quantitativeQuestions;
      case 'logical': return logicalQuestions;
      case 'verbal': return verbalQuestions;
      case 'technical': return technicalQuestions;
      default: return [];
    }
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswer({
      ...selectedAnswer,
      [questionId]: answerIndex
    });
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    const questions = getCurrentQuestions();
    let correct = 0;
    questions.forEach(q => {
      if (selectedAnswer[q.id] === q.correct) {
        correct++;
      }
    });
    return { correct, total: questions.length };
  };

  const renderNavigation = () => (
    <nav className="coding-navbar">
      <div className="coding-nav-container">
        <div className="coding-nav-logo">Aptitude Preparation</div>
        <ul className="coding-nav-menu">
          {navItems.map(item => (
            <li key={item.key} className="coding-nav-item">
              <button
                className={`coding-nav-link ${currentSection === item.key ? 'active' : ''}`}
                onClick={() => {
                  setCurrentSection(item.key);
                  setShowResults(false);
                  setSelectedAnswer({});
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );

  const renderHome = () => (
    <div className="fade-in">
      <div className="card">
        <h1>Aptitude Test Preparation</h1>
        <p>Master the essential aptitude skills required for technical interviews and placement exams. This comprehensive platform covers all major areas tested in competitive exams.</p>
        
        <div className="grid-2" style={{marginTop: '30px'}}>
          <div className="card">
            <h3>📊 Quantitative Aptitude</h3>
            <ul className="feature-list">
              <li>Time, Speed & Distance</li>
              <li>Profit & Loss calculations</li>
              <li>Simple & Compound Interest</li>
              <li>Percentage & Ratio problems</li>
              <li>Number series & patterns</li>
            </ul>
            <button className="btn btn-primary" onClick={() => setCurrentSection('quantitative')}>
              Start Quantitative
            </button>
          </div>
          
          <div className="card">
            <h3>🧠 Logical Reasoning</h3>
            <ul className="feature-list">
              <li>Coding-Decoding patterns</li>
              <li>Series completion</li>
              <li>Blood relations</li>
              <li>Direction sense</li>
              <li>Puzzle solving</li>
            </ul>
            <button className="btn btn-secondary" onClick={() => setCurrentSection('logical')}>
              Start Logical
            </button>
          </div>
          
          <div className="card">
            <h3>📝 Verbal Ability</h3>
            <ul className="feature-list">
              <li>Synonyms & Antonyms</li>
              <li>Reading comprehension</li>
              <li>Grammar & usage</li>
              <li>Sentence correction</li>
              <li>Vocabulary building</li>
            </ul>
            <button className="btn btn-success" onClick={() => setCurrentSection('verbal')}>
              Start Verbal
            </button>
          </div>
          
          <div className="card">
            <h3>💻 Technical MCQs</h3>
            <ul className="feature-list">
              <li>Java fundamentals</li>
              <li>OOP concepts</li>
              <li>Data structures</li>
              <li>Database basics</li>
              <li>Programming logic</li>
            </ul>
            <button className="btn btn-primary" onClick={() => setCurrentSection('technical')}>
              Start Technical
            </button>
          </div>
        </div>

        <div className="card" style={{marginTop: '30px'}}>
          <h3>🎯 Why Practice Aptitude?</h3>
          <div className="grid-3">
            <div>
              <h4>📈 Placement Success</h4>
              <p>Most companies have aptitude rounds as the first screening test</p>
            </div>
            <div>
              <h4>⏰ Time Management</h4>
              <p>Learn to solve problems quickly and accurately under time pressure</p>
            </div>
            <div>
              <h4>🏆 Competitive Edge</h4>
              <p>Strong aptitude skills give you an advantage in technical interviews</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuestions = () => {
    const questions = getCurrentQuestions();
    
    if (!questions.length) {
      return (
        <div className="card">
          <h2>No questions available for this section</h2>
          <p>Questions for this section are being prepared.</p>
        </div>
      );
    }

    return (
      <div className="fade-in">
        <div className="card">
          <h2>{navItems.find(item => item.key === currentSection)?.label}</h2>
          
          {!showResults ? (
            <>
              {questions.map((question, index) => (
                <div key={question.id} className="card" style={{margin: '20px 0'}}>
                  <h4>Question {index + 1}:</h4>
                  <p style={{fontSize: '1.1em', marginBottom: '15px'}}>{question.question}</p>
                  
                  <div style={{textAlign: 'left'}}>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} style={{margin: '10px 0'}}>
                        <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            checked={selectedAnswer[question.id] === optionIndex}
                            onChange={() => handleAnswerSelect(question.id, optionIndex)}
                            style={{marginRight: '10px'}}
                          />
                          <span>{String.fromCharCode(65 + optionIndex)}. {option}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              <button className="btn btn-primary" onClick={handleSubmitQuiz}>
                Submit Quiz
              </button>
            </>
          ) : (
            <div className="card">
              <h3>Quiz Results</h3>
              {(() => {
                const score = calculateScore();
                const percentage = (score.correct / score.total * 100).toFixed(1);
                return (
                  <>
                    <div style={{fontSize: '1.5em', margin: '20px 0'}}>
                      Score: {score.correct} / {score.total} ({percentage}%)
                    </div>
                    
                    <div style={{marginBottom: '20px'}}>
                      {percentage >= 80 ? (
                        <span style={{color: '#27ae60', fontSize: '1.2em'}}>🎉 Excellent Performance!</span>
                      ) : percentage >= 60 ? (
                        <span style={{color: '#f39c12', fontSize: '1.2em'}}>👍 Good Job!</span>
                      ) : (
                        <span style={{color: '#e74c3c', fontSize: '1.2em'}}>📚 Keep Practicing!</span>
                      )}
                    </div>

                    <h4>Detailed Solutions:</h4>
                    {questions.map((question, index) => (
                      <div key={question.id} className="card" style={{margin: '15px 0', textAlign: 'left'}}>
                        <p><strong>Q{index + 1}:</strong> {question.question}</p>
                        <p>
                          <strong>Your Answer:</strong> {
                            selectedAnswer[question.id] !== undefined ? 
                            question.options[selectedAnswer[question.id]] : 
                            'Not answered'
                          }
                          {selectedAnswer[question.id] === question.correct ? 
                            <span style={{color: '#27ae60'}}> ✓ Correct</span> : 
                            <span style={{color: '#e74c3c'}}> ✗ Incorrect</span>
                          }
                        </p>
                        <p><strong>Correct Answer:</strong> {question.options[question.correct]}</p>
                        <p><strong>Explanation:</strong> {question.explanation}</p>
                      </div>
                    ))}
                  </>
                );
              })()}
              
              <button className="btn btn-secondary" onClick={() => {
                setShowResults(false);
                setSelectedAnswer({});
              }}>
                Retake Quiz
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderTips = () => (
    <div className="fade-in">
      <div className="card">
        <h2>Aptitude Test Tips & Strategies</h2>
        
        <div className="grid-2">
          <div className="card">
            <h3>⏱️ Time Management</h3>
            <ul className="feature-list">
              <li>Allocate specific time for each section</li>
              <li>Don't spend too much time on difficult questions</li>
              <li>Mark questions for review and come back later</li>
              <li>Practice with a timer to improve speed</li>
            </ul>
          </div>
          
          <div className="card">
            <h3>📋 Preparation Strategy</h3>
            <ul className="feature-list">
              <li>Learn shortcuts and formulas by heart</li>
              <li>Practice daily for consistency</li>
              <li>Take mock tests regularly</li>
              <li>Analyze your mistakes and weak areas</li>
            </ul>
          </div>
          
          <div className="card">
            <h3>🎯 During the Test</h3>
            <ul className="feature-list">
              <li>Read questions carefully before answering</li>
              <li>Eliminate obviously wrong options first</li>
              <li>Make educated guesses when unsure</li>
              <li>Stay calm and manage exam anxiety</li>
            </ul>
          </div>
          
          <div className="card">
            <h3>📚 Study Resources</h3>
            <ul className="feature-list">
              <li>RS Aggarwal Quantitative Aptitude</li>
              <li>Arun Sharma's books for CAT preparation</li>
              <li>Online platforms like IndiaBix, Freshersworld</li>
              <li>Previous year question papers</li>
            </ul>
          </div>
        </div>
        
        <div className="card" style={{marginTop: '20px'}}>
          <h3>🏆 Common Mistakes to Avoid</h3>
          <div className="code-block">
• Calculation errors due to rushing
• Not reading the question completely
• Forgetting to check units in answers
• Spending too much time on one question
• Not practicing enough mock tests
• Ignoring negative marking patterns
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentSection) {
      case 'home':
        return renderHome();
      case 'quantitative':
      case 'logical':
      case 'verbal':
      case 'technical':
        return renderQuestions();
      case 'tips':
        return renderTips();
      case 'practice':
        return (
          <div className="fade-in">
            <div className="card">
              <h2>Practice Tests</h2>
              <p>Full-length practice tests coming soon! These will simulate real exam conditions.</p>
              <div className="grid-3">
                <div className="card">
                  <h4>Mock Test 1</h4>
                  <p>50 questions, 60 minutes</p>
                  <button className="btn btn-primary">Coming Soon</button>
                </div>
                <div className="card">
                  <h4>Mock Test 2</h4>
                  <p>75 questions, 90 minutes</p>
                  <button className="btn btn-primary">Coming Soon</button>
                </div>
                <div className="card">
                  <h4>Quick Test</h4>
                  <p>25 questions, 30 minutes</p>
                  <button className="btn btn-primary">Coming Soon</button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return renderHome();
    }
  };

  return (
    <div className="coding-page">
      {renderNavigation()}
      <main className="coding-main">
        <div className="container">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AptitudePage;
