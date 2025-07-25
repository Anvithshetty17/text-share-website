import React, { useState, useEffect } from 'react';

const StudentTools = () => {
  const [activeTool, setActiveTool] = useState('gpa');

  // GPA Calculator State
  const [gpaData, setGpaData] = useState({
    courses: [{ name: '', credits: '', grade: '' }],
    gpaScale: '4.0',
    currentGPA: '',
    currentCredits: ''
  });

  // Pomodoro Timer State
  const [pomodoroState, setPomodoroState] = useState({
    minutes: 25,
    seconds: 0,
    isActive: false,
    isBreak: false,
    cycle: 0
  });

  // Todo List State
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Load todos from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem('studenttools-todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem('studenttools-todos', JSON.stringify(todos));
  }, [todos]);

  // Pomodoro Timer Effect
  useEffect(() => {
    let interval = null;
    if (pomodoroState.isActive) {
      interval = setInterval(() => {
        setPomodoroState(prev => {
          if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 };
          } else if (prev.minutes > 0) {
            return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
          } else {
            // Timer finished
            const newIsBreak = !prev.isBreak;
            const newCycle = prev.isBreak ? prev.cycle + 1 : prev.cycle;
            return {
              ...prev,
              isActive: false,
              isBreak: newIsBreak,
              cycle: newCycle,
              minutes: newIsBreak ? 5 : 25,
              seconds: 0
            };
          }
        });
      }, 1000);
    } else if (!pomodoroState.isActive && pomodoroState.seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [pomodoroState.isActive, pomodoroState.seconds, pomodoroState.minutes]);

  // GPA Calculator Functions
  const gradePoints = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0
  };

  const calculateGPA = () => {
    const validCourses = gpaData.courses.filter(course => 
      course.name && course.credits && course.grade
    );

    if (validCourses.length === 0) return { gpa: 0, totalCredits: 0 };

    const totalPoints = validCourses.reduce((sum, course) => {
      return sum + (gradePoints[course.grade] * parseFloat(course.credits));
    }, 0);

    const totalCredits = validCourses.reduce((sum, course) => {
      return sum + parseFloat(course.credits);
    }, 0);

    return {
      gpa: (totalPoints / totalCredits).toFixed(2),
      totalCredits: totalCredits.toFixed(1)
    };
  };

  const calculateCumulativeGPA = () => {
    const currentResult = calculateGPA();
    if (!gpaData.currentGPA || !gpaData.currentCredits) {
      return currentResult;
    }

    const currentPoints = parseFloat(gpaData.currentGPA) * parseFloat(gpaData.currentCredits);
    const newPoints = parseFloat(currentResult.gpa) * parseFloat(currentResult.totalCredits);
    const totalCredits = parseFloat(gpaData.currentCredits) + parseFloat(currentResult.totalCredits);
    
    const cumulativeGPA = ((currentPoints + newPoints) / totalCredits).toFixed(2);
    
    return {
      gpa: cumulativeGPA,
      totalCredits: totalCredits.toFixed(1)
    };
  };

  const addCourse = () => {
    setGpaData(prev => ({
      ...prev,
      courses: [...prev.courses, { name: '', credits: '', grade: '' }]
    }));
  };

  const removeCourse = (index) => {
    setGpaData(prev => ({
      ...prev,
      courses: prev.courses.filter((_, i) => i !== index)
    }));
  };

  const updateCourse = (index, field, value) => {
    setGpaData(prev => ({
      ...prev,
      courses: prev.courses.map((course, i) => 
        i === index ? { ...course, [field]: value } : course
      )
    }));
  };

  // Pomodoro Functions
  const startPausePomodoro = () => {
    setPomodoroState(prev => ({ ...prev, isActive: !prev.isActive }));
  };

  const resetPomodoro = () => {
    setPomodoroState({
      minutes: 25,
      seconds: 0,
      isActive: false,
      isBreak: false,
      cycle: 0
    });
  };

  // Todo Functions
  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos(prev => [...prev, {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const tools = [
    { id: 'gpa', name: 'GPA Calculator', icon: '📊' },
    { id: 'pomodoro', name: 'Pomodoro Timer', icon: '⏰' },
    { id: 'todo', name: 'To-Do List', icon: '✅' },
    { id: 'templates', name: 'Templates', icon: '📄' },
    { id: 'tips', name: 'Resume Tips', icon: '💡' }
  ];

  const templates = [
    {
      name: 'Leave Application',
      content: `To,
The Principal/Manager
[Institution/Company Name]

Subject: Application for Leave

Respected Sir/Madam,

I am writing to inform you that I need to take leave from [start date] to [end date] due to [reason].

I will ensure that all my pending work is completed before my leave and will make arrangements for any urgent matters during my absence.

I would be grateful if you could approve my leave application.

Thank you for your consideration.

Yours sincerely,
[Your Name]
[Your ID/Roll Number]
[Date]`
    },
    {
      name: 'Project Abstract',
      content: `PROJECT ABSTRACT

Title: [Project Title]

Objective:
[Brief description of what you aim to achieve]

Problem Statement:
[Description of the problem your project addresses]

Methodology:
[Approach and methods used to solve the problem]

Technologies Used:
[List of programming languages, frameworks, tools, etc.]

Expected Outcomes:
[What results you expect to achieve]

Conclusion:
[Brief summary of the project's significance]

Keywords: [relevant keywords separated by commas]

Team Members:
[List of team members and their roles]

Supervisor: [Supervisor name and designation]`
    },
    {
      name: 'Internship Application',
      content: `Subject: Application for Internship Position

Dear Hiring Manager,

I am writing to express my interest in the internship position at [Company Name]. I am currently a [year] year student pursuing [degree] at [university name].

I am particularly interested in this opportunity because [reason for interest]. My academic background in [relevant subjects] and experience with [relevant skills/projects] make me a suitable candidate for this position.

I have attached my resume for your review and would appreciate the opportunity to discuss how I can contribute to your team.

Thank you for considering my application.

Best regards,
[Your Name]
[Contact Information]`
    }
  ];

  const resumeTips = [
    {
      category: 'Formatting',
      tips: [
        'Use a clean, professional font like Arial or Times New Roman',
        'Keep margins between 0.5" to 1"',
        'Use consistent formatting throughout',
        'Limit to 1-2 pages for entry-level positions',
        'Use bullet points for easy readability'
      ]
    },
    {
      category: 'Content',
      tips: [
        'Start with a strong professional summary',
        'Use action verbs to describe experiences',
        'Quantify achievements with numbers when possible',
        'Tailor your resume for each job application',
        'Include relevant keywords from job descriptions'
      ]
    },
    {
      category: 'Sections',
      tips: [
        'Contact Information (name, phone, email, LinkedIn)',
        'Professional Summary or Objective',
        'Education (include GPA if 3.5 or higher)',
        'Experience (work, internships, volunteer)',
        'Skills (technical and soft skills)',
        'Projects (especially for technical roles)'
      ]
    },
    {
      category: 'Common Mistakes',
      tips: [
        'Avoid spelling and grammar errors',
        "Don't use generic templates",
        "Don't include personal information like age or photo",
        "Don't lie or exaggerate experiences",
        "Don't use unprofessional email addresses"
      ]
    }
  ];

  return (
    <div className="student-tools-page">
      <div className="page-header text-center mb-4">
        <h1>Student Tools</h1>
        <p className="text-muted">
          Essential productivity tools designed specifically for students.
        </p>
      </div>

      <div className="tools-nav mb-4">
        <div className="tools-menu">
          {tools.map(tool => (
            <button
              key={tool.id}
              className={`tool-btn ${activeTool === tool.id ? 'active' : ''}`}
              onClick={() => setActiveTool(tool.id)}
            >
              <span className="tool-icon">{tool.icon}</span>
              <span className="tool-name">{tool.name}</span>
            </button>
          ))}
        </div>
      </div>

      {activeTool === 'gpa' && (
        <div className="gpa-calculator">
          <div className="card">
            <h2 className="card-title">GPA Calculator</h2>
            
            <div className="gpa-settings mb-3">
              <div className="form-group">
                <label className="form-label">GPA Scale</label>
                <select
                  className="form-select"
                  value={gpaData.gpaScale}
                  onChange={(e) => setGpaData(prev => ({ ...prev, gpaScale: e.target.value }))}
                >
                  <option value="4.0">4.0 Scale</option>
                  <option value="10.0">10.0 Scale</option>
                </select>
              </div>

              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">Current GPA (optional)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={gpaData.currentGPA}
                    onChange={(e) => setGpaData(prev => ({ ...prev, currentGPA: e.target.value }))}
                    placeholder="3.5"
                    step="0.01"
                    min="0"
                    max={gpaData.gpaScale}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Current Credits (optional)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={gpaData.currentCredits}
                    onChange={(e) => setGpaData(prev => ({ ...prev, currentCredits: e.target.value }))}
                    placeholder="60"
                    step="0.5"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="courses-section">
              <h3 className="card-subtitle">Courses</h3>
              {gpaData.courses.map((course, index) => (
                <div key={index} className="course-row">
                  <div className="grid grid-3">
                    <input
                      type="text"
                      className="form-input"
                      value={course.name}
                      onChange={(e) => updateCourse(index, 'name', e.target.value)}
                      placeholder="Course Name"
                    />
                    <input
                      type="number"
                      className="form-input"
                      value={course.credits}
                      onChange={(e) => updateCourse(index, 'credits', e.target.value)}
                      placeholder="Credits"
                      step="0.5"
                      min="0"
                    />
                    <select
                      className="form-select"
                      value={course.grade}
                      onChange={(e) => updateCourse(index, 'grade', e.target.value)}
                    >
                      <option value="">Select Grade</option>
                      {Object.keys(gradePoints).map(grade => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>
                  </div>
                  {gpaData.courses.length > 1 && (
                    <button
                      className="btn btn-danger btn-small"
                      onClick={() => removeCourse(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button className="btn btn-secondary" onClick={addCourse}>
                Add Course
              </button>
            </div>

            <div className="gpa-results mt-4">
              <div className="grid grid-2">
                <div className="result-card">
                  <h4>Semester GPA</h4>
                  <div className="gpa-value">{calculateGPA().gpa}</div>
                  <small>Credits: {calculateGPA().totalCredits}</small>
                </div>
                <div className="result-card">
                  <h4>Cumulative GPA</h4>
                  <div className="gpa-value">{calculateCumulativeGPA().gpa}</div>
                  <small>Total Credits: {calculateCumulativeGPA().totalCredits}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTool === 'pomodoro' && (
        <div className="pomodoro-timer">
          <div className="card text-center">
            <h2 className="card-title">Pomodoro Timer</h2>
            
            <div className="timer-display">
              <div className="timer-circle">
                <div className="timer-time">
                  {String(pomodoroState.minutes).padStart(2, '0')}:
                  {String(pomodoroState.seconds).padStart(2, '0')}
                </div>
                <div className="timer-label">
                  {pomodoroState.isBreak ? 'Break Time' : 'Work Time'}
                </div>
              </div>
            </div>

            <div className="timer-controls">
              <button
                className={`btn ${pomodoroState.isActive ? 'btn-warning' : 'btn-primary'}`}
                onClick={startPausePomodoro}
              >
                {pomodoroState.isActive ? 'Pause' : 'Start'}
              </button>
              <button className="btn btn-secondary" onClick={resetPomodoro}>
                Reset
              </button>
            </div>

            <div className="timer-info">
              <p>Completed Cycles: {pomodoroState.cycle}</p>
              <div className="pomodoro-help">
                <h4>How it works:</h4>
                <ul>
                  <li>🍅 Work for 25 minutes focused</li>
                  <li>☕ Take a 5-minute break</li>
                  <li>🔄 Repeat the cycle</li>
                  <li>🎯 After 4 cycles, take a longer break</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTool === 'todo' && (
        <div className="todo-list">
          <div className="card">
            <h2 className="card-title">To-Do List</h2>
            
            <form onSubmit={addTodo} className="todo-form">
              <div className="todo-input-group">
                <input
                  type="text"
                  className="form-input"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add a new task..."
                />
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </div>
            </form>

            <div className="todo-stats">
              <span>Total: {todos.length}</span>
              <span>Completed: {todos.filter(t => t.completed).length}</span>
              <span>Remaining: {todos.filter(t => !t.completed).length}</span>
            </div>

            <div className="todo-items">
              {todos.length === 0 ? (
                <p className="text-muted text-center">No tasks yet. Add one above!</p>
              ) : (
                todos.map(todo => (
                  <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                    <label className="todo-checkbox">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                      />
                      <span className="todo-text">{todo.text}</span>
                    </label>
                    <button
                      className="btn btn-danger btn-small"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {activeTool === 'templates' && (
        <div className="templates-section">
          <div className="card">
            <h2 className="card-title">Document Templates</h2>
            <p className="text-muted">Pre-filled templates for common student documents.</p>
            
            <div className="templates-grid">
              {templates.map((template, index) => (
                <div key={index} className="template-card">
                  <h3 className="template-title">{template.name}</h3>
                  <textarea
                    className="template-content"
                    value={template.content}
                    readOnly
                    rows={15}
                  />
                  <div className="template-actions">
                    <button
                      className="btn btn-primary"
                      onClick={() => navigator.clipboard.writeText(template.content)}
                    >
                      Copy Template
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTool === 'tips' && (
        <div className="resume-tips">
          <div className="card">
            <h2 className="card-title">Resume Writing Tips</h2>
            <p className="text-muted">Professional tips to create an outstanding resume.</p>
            
            <div className="tips-grid">
              {resumeTips.map((section, index) => (
                <div key={index} className="tips-section">
                  <h3 className="tips-category">{section.category}</h3>
                  <ul className="tips-list">
                    {section.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="tip-item">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .tools-nav {
          background-color: var(--bg-secondary);
          border-radius: 12px;
          padding: 1rem;
          overflow-x: auto;
        }

        .tools-menu {
          display: flex;
          gap: 0.5rem;
          min-width: fit-content;
        }

        .tool-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          background: none;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 100px;
        }

        .tool-btn:hover {
          background-color: var(--bg-tertiary);
        }

        .tool-btn.active {
          background-color: var(--accent-primary);
          color: white;
          border-color: var(--accent-primary);
        }

        .tool-icon {
          font-size: 1.5rem;
        }

        .tool-name {
          font-size: 0.875rem;
          font-weight: 500;
        }

        .course-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          padding: 1rem;
          background-color: var(--bg-tertiary);
          border-radius: 8px;
        }

        .course-row .grid {
          flex: 1;
        }

        .result-card {
          text-align: center;
          padding: 1.5rem;
          background-color: var(--bg-tertiary);
          border-radius: 8px;
        }

        .gpa-value {
          font-size: 2rem;
          font-weight: bold;
          color: var(--accent-primary);
          margin: 0.5rem 0;
        }

        .timer-display {
          margin: 2rem 0;
        }

        .timer-circle {
          width: 200px;
          height: 200px;
          border: 8px solid var(--accent-primary);
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          background-color: var(--bg-tertiary);
        }

        .timer-time {
          font-size: 2.5rem;
          font-weight: bold;
          color: var(--accent-primary);
        }

        .timer-label {
          font-size: 1rem;
          color: var(--text-secondary);
          margin-top: 0.5rem;
        }

        .timer-controls {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin: 2rem 0;
        }

        .pomodoro-help ul {
          text-align: left;
          max-width: 300px;
          margin: 0 auto;
        }

        .todo-input-group {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .todo-input-group .form-input {
          flex: 1;
        }

        .todo-stats {
          display: flex;
          gap: 2rem;
          justify-content: center;
          margin-bottom: 1rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .todo-items {
          max-height: 400px;
          overflow-y: auto;
        }

        .todo-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          border-bottom: 1px solid var(--border-color);
        }

        .todo-item.completed {
          opacity: 0.6;
        }

        .todo-checkbox {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex: 1;
          cursor: pointer;
        }

        .todo-text {
          flex: 1;
        }

        .todo-item.completed .todo-text {
          text-decoration: line-through;
        }

        .templates-grid {
          display: grid;
          gap: 2rem;
        }

        .template-card {
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1rem;
        }

        .template-title {
          margin-bottom: 1rem;
          color: var(--accent-primary);
        }

        .template-content {
          width: 100%;
          font-family: monospace;
          font-size: 0.875rem;
          resize: vertical;
          margin-bottom: 1rem;
        }

        .template-actions {
          text-align: center;
        }

        .tips-grid {
          display: grid;
          gap: 2rem;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        }

        .tips-section {
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1.5rem;
        }

        .tips-category {
          color: var(--accent-primary);
          margin-bottom: 1rem;
          border-bottom: 2px solid var(--accent-primary);
          padding-bottom: 0.5rem;
        }

        .tips-list {
          list-style: none;
          padding: 0;
        }

        .tip-item {
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--border-color);
          position: relative;
          padding-left: 1.5rem;
        }

        .tip-item:before {
          content: '✓';
          position: absolute;
          left: 0;
          color: var(--accent-secondary);
          font-weight: bold;
        }

        .tip-item:last-child {
          border-bottom: none;
        }

        .btn-small {
          padding: 0.25rem 0.5rem;
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .tools-menu {
            flex-wrap: wrap;
          }

          .tool-btn {
            min-width: 80px;
            padding: 0.75rem;
          }

          .timer-circle {
            width: 150px;
            height: 150px;
          }

          .timer-time {
            font-size: 2rem;
          }

          .course-row {
            flex-direction: column;
            align-items: stretch;
          }

          .todo-stats {
            flex-direction: column;
            gap: 0.5rem;
            text-align: center;
          }

          .tips-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default StudentTools;
