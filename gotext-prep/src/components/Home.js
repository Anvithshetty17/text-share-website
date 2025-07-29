import React from 'react';

const Home = () => {
  return (
    <div className="fade-in">
      <div className="card">
        <h1>Java Coding Round Preparation</h1>
        <p>Welcome to your comprehensive Java coding preparation platform! This application is designed to help you master the most important Java concepts for coding interviews.</p>
        
        <div className="grid-2" style={{marginTop: '30px'}}>
          <div className="card">
            <h3>📚 Core Concepts</h3>
            <ul className="feature-list">
              <li>String manipulation and methods</li>
              <li>Array operations and algorithms</li>
              <li>Collections Framework deep dive</li>
              <li>Data Structures (Trees, Graphs)</li>
            </ul>
          </div>
          
          <div className="card">
            <h3>💡 Practice Questions</h3>
            <ul className="feature-list">
              <li>30+ coding problems</li>
              <li>Easy, Medium, Hard difficulty levels</li>
              <li>Helpful hints and solutions</li>
              <li>Real interview scenarios</li>
            </ul>
          </div>
        </div>
        
        <div className="card">
          <h2>Quick Navigation</h2>
          <div className="grid-3">
            <div style={{textAlign: 'center'}}>
              <h4>🔤 Strings</h4>
              <p>All string methods with examples and use cases</p>
            </div>
            <div style={{textAlign: 'center'}}>
              <h4>📊 Arrays</h4>
              <p>Array operations, algorithms, and common patterns</p>
            </div>
            <div style={{textAlign: 'center'}}>
              <h4>📋 Collections</h4>
              <p>Complete Collections Framework guide</p>
            </div>
            <div style={{textAlign: 'center'}}>
              <h4>🌳 Data Structures</h4>
              <p>Trees, Graphs, and advanced data structures</p>
            </div>
            <div style={{textAlign: 'center'}}>
              <h4>🎯 Practice</h4>
              <p>Coding questions with hints and solutions</p>
            </div>
            <div style={{textAlign: 'center'}}>
              <h4>🚀 Interview Ready</h4>
              <p>Everything you need to ace your coding round</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <h2>Study Tips</h2>
          <ul className="study-tips">
            <li><strong>Practice Regularly:</strong> Consistency is key to mastering coding concepts</li>
            <li><strong>Understand Time Complexity:</strong> Always consider the efficiency of your solutions</li>
            <li><strong>Code by Hand:</strong> Practice writing code without IDE assistance</li>
            <li><strong>Explain Your Approach:</strong> Practice verbalizing your thought process</li>
            <li><strong>Learn from Mistakes:</strong> Review and understand every error you make</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
