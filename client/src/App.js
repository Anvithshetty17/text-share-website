import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TextShare from './pages/TextShare';
import ResumeBuilder from './pages/ResumeBuilder';
import LinkShortener from './pages/LinkShortener';
import StudentTools from './pages/StudentTools';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <div className="App" data-theme="light">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/text-share" element={<TextShare />} />
            <Route path="/resume-builder" element={<ResumeBuilder />} />
            <Route path="/link-shortener" element={<LinkShortener />} />
            <Route path="/student-tools" element={<StudentTools />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
