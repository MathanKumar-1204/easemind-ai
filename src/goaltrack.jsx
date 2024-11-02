import React, { useState, useEffect } from 'react';
import './calendar.css'; // Ensure this file exists and contains relevant styles
import Menu from './Menu'
import './menu.css'


const GoalTrackerelement = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    goal: '',
    category: 'mindfulness',
    deadline: '',
    milestones: ''
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const savedGoals = JSON.parse(localStorage.getItem('goals')) || [];
    setGoals(savedGoals);
  }, []);

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    generateCalendar();
  }, [currentMonth, currentYear]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGoal(prev => ({ ...prev, [name]: value }));
  };

  const handleMilestonesChange = (e) => {
    setNewGoal(prev => ({ ...prev, milestones: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const goalObj = {
      ...newGoal,
      milestones: newGoal.milestones.split('\n').filter(m => m.trim() !== ''),
      progress: 0
    };
    setGoals(prev => [...prev, goalObj]);
    setNewGoal({
      goal: '',
      category: 'mindfulness',
      deadline: '',
      milestones: ''
    });
  };

  const markProgress = (index) => {
    setGoals(prev => {
      const updatedGoals = [...prev];
      if (updatedGoals[index].progress < 100) {
        updatedGoals[index].progress += 20;
        if (updatedGoals[index].progress >= 100) {
          updatedGoals[index].progress = 100;
          alert("Congratulations! You've completed a goal. Keep up the great work!");
        }
      }
      return updatedGoals;
    });
  };

  const deleteGoal = (index) => {
    setGoals(prev => prev.filter((_, i) => i !== index));
  };

  const generateCalendar = () => {
    const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null); // Empty cells for days before the start of the month
    }
    for (let i = 1; i <= lastDay; i++) {
      days.push({
        date: `${currentYear}-${('0' + (currentMonth + 1)).slice(-2)}-${('0' + i).slice(-2)}`,
        day: i
      });
    }

    setDaysInMonth(days);
  };

  const showGoalsForDate = (date) => {
    setSelectedDate(date);
  };

  const goalsForDate = goals.filter(goal => goal.deadline === selectedDate);

  const handlePrevMonth = () => {
    setCurrentMonth(prevMonth => prevMonth === 0 ? 11 : prevMonth - 1);
    if (currentMonth === 0) {
      setCurrentYear(prevYear => prevYear - 1);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth(prevMonth => prevMonth === 11 ? 0 : prevMonth + 1);
    if (currentMonth === 11) {
      setCurrentYear(prevYear => prevYear + 1);
    }
  };

  const handlePrevYear = () => {
    setCurrentYear(prevYear => prevYear - 1);
  };

  const handleNextYear = () => {
    setCurrentYear(prevYear => prevYear + 1);
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthName = monthNames[currentMonth];

  return (
    <div>   
      <div style={{   marginTop:'80%' ,justifyContent: 'space-between', gap: '20px', width:'90%' }}>
        <div style={{
          backgroundColor: '#ffffff58',
          padding: '20px',
          borderRadius: '10px',
          width: '100%',
          height: '90vh',
          overflowY: 'scroll',
        }}>
          <h2>Create a New Goal</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>  
              <label htmlFor="goal" style={{  display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Goal:</label>
              <input
                type="text"
                id="goal"
                name="goal"
                value={newGoal.goal}
                onChange={handleChange}
                placeholder="e.g., Meditate 10 minutes daily"
                required
                style={{ width: '90%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="category" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Category:</label>
              <select
                id="category"
                name="category"
                value={newGoal.category}
                onChange={handleChange}
                style={{ width: '90%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px' }}
              >
                <option value="mindfulness">Mindfulness</option>
                <option value="sleep">Sleep</option>
                <option value="exercise">Exercise</option>
                <option value="time management">Time Management</option>
              </select>
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="deadline" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Target Date:</label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={newGoal.deadline}
                onChange={handleChange}
                required
                style={{ width: '90%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="milestones" style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Milestones (Optional):</label>
              <textarea
                id="milestones"
                name="milestones"
                value={newGoal.milestones}
                onChange={handleMilestonesChange}
                placeholder="Break your goal into smaller steps (one per line)"
                style={{ width: '90%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px' }}
              ></textarea>
            </div>
            <button type="submit" style={{
              width: '40%',
              padding: '10px',
              backgroundColor: '#4285f4',
              border: 'none',
              borderRadius: '5px',
              color: '#fff',
              fontSize: '16px',
              cursor: 'pointer',
              marginBottom: '10px'
            }}>Set Goal</button>
          </form>
          <h2>Completed Goals</h2>
          
          <div>
            {goals.filter(goal => goal.progress >= 100).map((goal, index) => (
              <div key={index} style={{
                backgroundColor: '#eef3f7',
                padding: '15px',
                marginBottom: '20px',
                borderRadius: '8px'
              }}>
                <h3>{goal.goal} ({goal.category})</h3>
                <p>Target Date: {goal.deadline}</p>
                <p>Milestones:</p>
                <ul>
                  {goal.milestones.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
                <div style={{
                  backgroundColor: '#d9e3f0',
                  height: '10px',
                  width: '100%',
                  borderRadius: '5px',
                  marginTop: '10px',
                  marginBottom: '10px'
                }}>
                  <div style={{
                    backgroundColor: '#4caf50',
                    height: '100%',
                    width: '100%',
                    borderRadius: '5px'
                  }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ padding: '20px',marginTop:'30px', borderRadius: '10px', height: '100vh', overflowY: 'scrool' }}>
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <button onClick={handlePrevYear} style={{ marginRight: '10px' }}>Prev Year</button>
            <button onClick={handlePrevMonth} style={{ marginRight: '10px' }}>Prev Month</button>
            <span className='current'>{monthName} {currentYear}</span>
            <button onClick={handleNextMonth} style={{ marginLeft: '10px' }}>Next Month</button>
            <button onClick={handleNextYear} style={{ marginLeft: '10px' }}>Next Year</button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', width: '80%', marginLeft: '10%' }}>
            {daysInMonth.map((day, index) => (
              <div
                key={index}
                onClick={() => day && showGoalsForDate(day.date)}
                style={{
                  width: '14%',
                  padding: '10px',
                  borderRadius: '5px',
                  backgroundColor: day ? 'lightgrey' : 'transparent',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}
              >
                {day ? day.day : ''}
              </div>
            ))}
          </div>
          {selectedDate && (
            <div style={{ marginTop: '20px' }}>
              <h3>Goals for {selectedDate}</h3>
              <ul>
                {goalsForDate.map((goal, index) => (
                  <li key={index} style={{ marginBottom: '10px' }}>
                    <div style={{
                      backgroundColor: '#eef3f7',
                      padding: '10px',
                      borderRadius: '5px'
                    }}>
                      <h4>{goal.goal}</h4>
                      <p>Category: {goal.category}</p>
                      <p>Milestones:</p>
                      <ul>
                        {goal.milestones.map((m, i) => <li key={i}>{m}</li>)}
                      </ul>
                      <div style={{
                        backgroundColor: '#d9e3f0',
                        height: '10px',
                        width: '100%',
                        borderRadius: '5px',
                        marginTop: '10px',
                        marginBottom: '10px'
                      }}>
                        <div style={{
                          backgroundColor: '#4caf50',
                          height: '100%',
                          width: `${goal.progress}%`,
                          borderRadius: '5px',
                          transition: 'width 0.3s ease'
                        }}></div>
                      </div>
                      <button
                        onClick={() => markProgress(index)}
                        style={{
                          padding: '8px 12px',
                          backgroundColor: '#4caf50',
                          border: 'none',
                          borderRadius: '5px',
                          color: '#fff',
                          cursor: 'pointer',
                          marginRight: '10px'
                        }}
                      >
                        Mark Progress
                      </button>
                      <button
                        onClick={() => deleteGoal(index)}
                        style={{
                          padding: '8px 12px',
                          backgroundColor: '#e53935',
                          border: 'none',
                          borderRadius: '5px',
                          color: '#fff',
                          cursor: 'pointer'
                        }}
                      >
                        Delete Goal
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default function GoalTracker() {
  return (
    <>
    <video autoPlay loop muted id="background-video">
        <source src="/sun.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    <div className='menubar'>
        <Menu/>
    </div>
    <div className='main'>
        <GoalTrackerelement/>
    </div></>
  )
}

