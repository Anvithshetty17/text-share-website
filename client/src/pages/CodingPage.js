import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import Strings from '../components/Strings';
import Arrays from '../components/Arrays';
import Collections from '../components/Collections';
import DataStructures from '../components/DataStructures';
import PracticeQuestions from '../components/PracticeQuestions';
import Algorithms from '../components/Algorithms';
import InterviewTips from '../components/InterviewTips';

function CodingPage() {
  const [currentSection, setCurrentSection] = useState('home');

  const renderContent = () => {
    switch (currentSection) {
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
      <header className="page-header">
        <h1>🚀 Coding Interview Preparation</h1>
        <p>Master programming concepts and ace your coding interviews</p>
      </header>
      
      <Navbar currentPage={currentSection} setCurrentPage={setCurrentSection} />
      
      <main className="page-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default CodingPage;
