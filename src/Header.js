import React, { useEffect, useState } from 'react';
import './Header.css'; // Import the CSS file for styles

const Header = ({ username, prediction }) => {  // Accept prediction as a prop
  const [testTakenToday, setTestTakenToday] = useState(false);
  
  // Check if the test has been taken today
  useEffect(() => {
    const today = new Date().toLocaleDateString();
    const lastTestDate = localStorage.getItem('lastTestDate');
    if (lastTestDate === today) {
      setTestTakenToday(true);
    } else {
      setTestTakenToday(false);
    }
  }, []);

  // Function to handle the test prompt
  const handleTestPrompt = () => {
    alert('Please take your mental health test for today!');
    localStorage.setItem('lastTestDate', new Date().toLocaleDateString());
    setTestTakenToday(true);
  };

  return (
    <header className="header">
      <div className="welcome-message">
        <h1 className='title'>EaseMind - Mental wellness, simplified</h1>
        {username && <p>Welcome, {username}!</p>}  {/* Display username if available */}
        {prediction && <p>Your Analysis Prediction: {prediction}</p>} {/* Display prediction if available */}
      </div>
      
      <div className="mental-health-graph">
        <h2>Your Mental Health Graph (Last 6 Days)</h2>
        {/* Placeholder for mental health graph */}
        <div className="graph-placeholder">
          <img className='graph' src='/graph.png' alt="graph" />
        </div>
      </div>
      
      <div className="test-reminder">
        {!testTakenToday && (
          <button onClick={handleTestPrompt}>
            Take Your Test
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
