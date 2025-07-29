import React, { useState } from 'react';
import './CodingPage.css';
import Home from '../components/Home';
import Strings from '../components/Strings';
import Arrays from '../components/Arrays';
import Collections from '../components/Collections';
import DataStructures from '../components/DataStructures';
import PracticeQuestions from '../components/PracticeQuestions';
import Algorithms from '../components/Algorithms';
import InterviewTips from '../components/InterviewTips';

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
          <div className="coding-nav-logo">Gotext Prep</div>
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
