import React, { useState } from 'react';
import './CodingPage.css';
import Home from '../components/prep/Home';
import Strings from '../components/prep/Strings';
import Arrays from '../components/prep/Arrays';
import Collections from '../components/prep/Collections';
import DataStructures from '../components/prep/DataStructures';
import PracticeQuestions from '../components/prep/PracticeQuestions';
import Algorithms from '../components/prep/Algorithms';
import InterviewTips from '../components/prep/InterviewTips';

const CodingPage = () => {
  const [currentSection, setCurrentSection] = useState('home');

  const navItems = [
    { key: 'home', label: 'Home' },
    { key: 'strings', label: 'Strings' },
    { key: 'arrays', label: 'Arrays' },
    { key: 'collections', label: 'Collections' },
    { key: 'datastructures', label: 'Data Structures' },
    { key: 'practice', label: 'Practice Questions' },
    { key: 'algorithms', label: 'Algorithms' },
    { key: 'tips', label: 'Interview Tips' }
  ];

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return <Home />;
      case 'strings':
        return <Strings />;
      case 'arrays':
        return <Arrays />;
      case 'collections':
        return <Collections />;
      case 'datastructures':
        return <DataStructures />;
      case 'practice':
        return <PracticeQuestions />;
      case 'algorithms':
        return <Algorithms />;
      case 'tips':
        return <InterviewTips />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="coding-page">
      {/* Navigation for coding sections */}
      <nav className="coding-navbar">
        <div className="coding-nav-container">
          <div className="coding-nav-logo">Java Coding Prep</div>
          <ul className="coding-nav-menu">
            {navItems.map(item => (
              <li
                key={item.key}
                className={`coding-nav-item ${currentSection === item.key ? 'active' : ''}`}
                onClick={() => setCurrentSection(item.key)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main content area */}
      <main className="coding-main-content">
        {renderSection()}
      </main>
    </div>
  );
};

export default CodingPage;
