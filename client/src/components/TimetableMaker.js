import React, { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import './styles/TimetableMaker.css';
import AdBanner from "./AdBanner";
import BannerAdBox from "./BannerAdBox";

const TimetableMaker = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    institution: '',
    class: '',
    semester: '',
    academicYear: ''
  });

  const [timeSlots, setTimeSlots] = useState([
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 1:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM'
  ]);

  const [timetable, setTimetable] = useState({});
  const [savedTimetables, setSavedTimetables] = useState([]);
  const [currentTimetableName, setCurrentTimetableName] = useState('');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    // Load saved timetables from localStorage
    const saved = localStorage.getItem('savedTimetables');
    if (saved) {
      setSavedTimetables(JSON.parse(saved));
    }

    // Initialize empty timetable
    const emptyTimetable = {};
    daysOfWeek.forEach(day => {
      emptyTimetable[day] = {};
      timeSlots.forEach(slot => {
        emptyTimetable[day][slot] = {
          subject: '',
          teacher: '',
          room: '',
          type: 'lecture' // lecture, lab, tutorial, break
        };
      });
    });
    setTimetable(emptyTimetable);
  }, []);

  const handleUserInfoChange = (field, value) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCellChange = (day, slot, field, value) => {
    setTimetable(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [slot]: {
          ...prev[day][slot],
          [field]: value
        }
      }
    }));
  };

  const addTimeSlot = () => {
    const newSlot = prompt('Enter new time slot (e.g., "5:00 PM - 6:00 PM"):');
    if (newSlot && !timeSlots.includes(newSlot)) {
      const newTimeSlots = [...timeSlots, newSlot];
      setTimeSlots(newTimeSlots);
      
      // Add this slot to all days
      setTimetable(prev => {
        const newTimetable = { ...prev };
        daysOfWeek.forEach(day => {
          newTimetable[day] = {
            ...newTimetable[day],
            [newSlot]: {
              subject: '',
              teacher: '',
              room: '',
              type: 'lecture'
            }
          };
        });
        return newTimetable;
      });
    }
  };

  const removeTimeSlot = (slotToRemove) => {
    const newTimeSlots = timeSlots.filter(slot => slot !== slotToRemove);
    setTimeSlots(newTimeSlots);
    
    // Remove this slot from all days
    setTimetable(prev => {
      const newTimetable = { ...prev };
      daysOfWeek.forEach(day => {
        const { [slotToRemove]: removed, ...rest } = newTimetable[day];
        newTimetable[day] = rest;
      });
      return newTimetable;
    });
  };

  const saveTimetable = () => {
    const name = currentTimetableName || prompt('Enter a name for this timetable:');
    if (!name) return;

    const newTimetable = {
      id: Date.now(),
      name,
      userInfo,
      timetable,
      timeSlots,
      createdAt: new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString()
    };

    const updated = savedTimetables.filter(tt => tt.name !== name);
    updated.unshift(newTimetable);
    
    setSavedTimetables(updated);
    localStorage.setItem('savedTimetables', JSON.stringify(updated));
    setCurrentTimetableName(name);
    alert('Timetable saved successfully!');
  };

  const loadTimetable = (savedTimetable) => {
    setUserInfo(savedTimetable.userInfo);
    setTimetable(savedTimetable.timetable);
    setTimeSlots(savedTimetable.timeSlots);
    setCurrentTimetableName(savedTimetable.name);
  };

  const deleteTimetable = (id) => {
    if (window.confirm('Are you sure you want to delete this timetable?')) {
      const updated = savedTimetables.filter(tt => tt.id !== id);
      setSavedTimetables(updated);
      localStorage.setItem('savedTimetables', JSON.stringify(updated));
    }
  };

  const exportToPDF = () => {
    const element = document.getElementById('timetable-to-export');
    const opt = {
      margin: 0.5,
      filename: `${userInfo.name || 'Timetable'}_${currentTimetableName || 'Schedule'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
    };

    html2pdf().set(opt).from(element).save();
  };

  const clearTimetable = () => {
    if (window.confirm('Are you sure you want to clear the entire timetable?')) {
      const emptyTimetable = {};
      daysOfWeek.forEach(day => {
        emptyTimetable[day] = {};
        timeSlots.forEach(slot => {
          emptyTimetable[day][slot] = {
            subject: '',
            teacher: '',
            room: '',
            type: 'lecture'
          };
        });
      });
      setTimetable(emptyTimetable);
      setCurrentTimetableName('');
    }
  };

  const getCellClassName = (type) => {
    switch (type) {
      case 'lab': return 'cell-lab';
      case 'tutorial': return 'cell-tutorial';
      case 'break': return 'cell-break';
      default: return 'cell-lecture';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'lab': return '#3b82f6';
      case 'tutorial': return '#10b981';
      case 'break': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <div className="timetable-maker-container">
      <div className="timetable-header">
        <h1>📅 Timetable Maker</h1>
        <p>Create and manage your academic schedule</p>
      </div>
         <AdBanner />

      {/* User Information Section */}
      <div className="user-info-section">
        <h2>📝 Personal Information</h2>
        <div className="user-info-grid">
          <div className="info-field">
            <label>Name:</label>
            <input
              type="text"
              value={userInfo.name}
              onChange={(e) => handleUserInfoChange('name', e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div className="info-field">
            <label>Institution:</label>
            <input
              type="text"
              value={userInfo.institution}
              onChange={(e) => handleUserInfoChange('institution', e.target.value)}
              placeholder="School/College name"
            />
          </div>
          <div className="info-field">
            <label>Class/Grade:</label>
            <input
              type="text"
              value={userInfo.class}
              onChange={(e) => handleUserInfoChange('class', e.target.value)}
              placeholder="e.g., 12th Grade, CSE"
            />
          </div>
          <div className="info-field">
            <label>Semester:</label>
            <input
              type="text"
              value={userInfo.semester}
              onChange={(e) => handleUserInfoChange('semester', e.target.value)}
              placeholder="e.g., Fall 2024"
            />
          </div>
          <div className="info-field">
            <label>Academic Year:</label>
            <input
              type="text"
              value={userInfo.academicYear}
              onChange={(e) => handleUserInfoChange('academicYear', e.target.value)}
              placeholder="e.g., 2024-2025"
            />
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="controls-section">
        <div className="control-group">
          <h3>⚡ Quick Actions</h3>
          <div className="control-buttons">
            <button onClick={addTimeSlot} className="btn-primary">
              ➕ Add Time Slot
            </button>
            <button onClick={saveTimetable} className="btn-success">
              💾 Save Timetable
            </button>
            <button onClick={exportToPDF} className="btn-info">
              📄 Export PDF
            </button>
            <button onClick={clearTimetable} className="btn-danger">
              🗑️ Clear All
            </button>
          </div>
        </div>

        <div className="legend">
          <h4>📋 Class Types</h4>
          <div className="legend-items">
            <span className="legend-item">
              <span className="legend-color" style={{backgroundColor: getTypeColor('lecture')}}></span>
              Lecture
            </span>
            <span className="legend-item">
              <span className="legend-color" style={{backgroundColor: getTypeColor('lab')}}></span>
              Lab
            </span>
            <span className="legend-item">
              <span className="legend-color" style={{backgroundColor: getTypeColor('tutorial')}}></span>
              Tutorial
            </span>
            <span className="legend-item">
              <span className="legend-color" style={{backgroundColor: getTypeColor('break')}}></span>
              Break
            </span>
          </div>
        </div>
      </div>

      {/* Timetable Section */}
      <div className="timetable-section" id="timetable-to-export">
        <div className="timetable-info-header">
          <h2>📚 Class Schedule</h2>
          {userInfo.name && (
            <div className="student-info">
              <p><strong>Student:</strong> {userInfo.name}</p>
              {userInfo.institution && <p><strong>Institution:</strong> {userInfo.institution}</p>}
              {userInfo.class && <p><strong>Class:</strong> {userInfo.class}</p>}
              {userInfo.semester && <p><strong>Semester:</strong> {userInfo.semester}</p>}
              {userInfo.academicYear && <p><strong>Academic Year:</strong> {userInfo.academicYear}</p>}
            </div>
          )}
        </div>
<BannerAdBox />
        <div className="timetable-wrapper">
          <table className="timetable">
            <thead>
              <tr>
                <th className="time-header">Time</th>
                {daysOfWeek.map(day => (
                  <th key={day} className="day-header">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map(slot => (
                <tr key={slot}>
                  <td className="time-slot">
                    <div className="time-slot-content">
                      {slot}
                      <button 
                        className="remove-slot-btn"
                        onClick={() => removeTimeSlot(slot)}
                        title="Remove this time slot"
                      >
                        ❌
                      </button>
                    </div>
                  </td>
                  {daysOfWeek.map(day => (
                    <td key={`${day}-${slot}`} className={`timetable-cell ${getCellClassName(timetable[day]?.[slot]?.type)}`}>
                      <div className="cell-content">
                        <select
                          value={timetable[day]?.[slot]?.type || 'lecture'}
                          onChange={(e) => handleCellChange(day, slot, 'type', e.target.value)}
                          className="type-select"
                        >
                          <option value="lecture">Lecture</option>
                          <option value="lab">Lab</option>
                          <option value="tutorial">Tutorial</option>
                          <option value="break">Break</option>
                        </select>
                        
                        <input
                          type="text"
                          placeholder="Subject"
                          value={timetable[day]?.[slot]?.subject || ''}
                          onChange={(e) => handleCellChange(day, slot, 'subject', e.target.value)}
                          className="subject-input"
                        />
                        
                        <input
                          type="text"
                          placeholder="Teacher"
                          value={timetable[day]?.[slot]?.teacher || ''}
                          onChange={(e) => handleCellChange(day, slot, 'teacher', e.target.value)}
                          className="teacher-input"
                        />
                        
                        <input
                          type="text"
                          placeholder="Room"
                          value={timetable[day]?.[slot]?.room || ''}
                          onChange={(e) => handleCellChange(day, slot, 'room', e.target.value)}
                          className="room-input"
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Saved Timetables Section */}
      <div className="saved-timetables-section">
        <h2>💾 Saved Timetables</h2>
        {savedTimetables.length > 0 ? (
          <div className="saved-timetables-grid">
            {savedTimetables.map(savedTT => (
              <div key={savedTT.id} className="saved-timetable-card">
                <h4>{savedTT.name}</h4>
                <p><strong>Student:</strong> {savedTT.userInfo.name || 'N/A'}</p>
                <p><strong>Institution:</strong> {savedTT.userInfo.institution || 'N/A'}</p>
                <p><strong>Created:</strong> {savedTT.createdAt}</p>
                <p><strong>Updated:</strong> {savedTT.updatedAt}</p>
                <div className="card-actions">
                  <button 
                    onClick={() => loadTimetable(savedTT)}
                    className="btn-primary"
                  >
                    📂 Load
                  </button>
                  <button 
                    onClick={() => deleteTimetable(savedTT.id)}
                    className="btn-danger"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-saved-timetables">
            <p>No saved timetables yet. Create and save your first timetable!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimetableMaker;
