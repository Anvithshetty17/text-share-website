import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import TextShare from './pages/TextShare';
import ResumeBuilder from './pages/ResumeBuilder';
import LinkShortener from './pages/LinkShortener';
import StudentTools from './pages/StudentTools';
import Admin from './pages/Admin';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import TypingRace from './components/TypingRace';
import GamingZone from './components/GamingZone';
import TimetableMaker from './components/TimetableMaker';
import CodingPage from './pages/CodingPage';


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
            <Route path="/typing-race" element={<TypingRace />} />
            <Route path="/gaming-zone" element={<GamingZone />} />
            <Route path="/timetable-maker" element={<TimetableMaker />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
   <Route path="/CodingPage" element={<CodingPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
