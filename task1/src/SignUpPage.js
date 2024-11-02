import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './SignUpPage.css';

const SignUpPage = () => {
  const [studentDetails, setStudentDetails] = useState({
    name: '',
    degree: '',
    branch: '',
    age: ''
  });

  const [showWelcome, setShowWelcome] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSignUp = () => {
    setShowWelcome(true);
  };

  const handleImageClick = () => {
    setIsFlipped(!isFlipped); 
  };

  return (
    <div className="page-container">
      <div className="sign-up-container">
        <div className="form-header">Sign Up</div>
        <form className="sign-up-form">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={studentDetails.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Degree Name:
            <select
              name="degree"
              value={studentDetails.degree}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select your degree</option>
              <option value="Bachelors">Bachelors</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
              
            </select>
          </label>
          <label>
            Branch/Department:
            <select
              name="branch"
              value={studentDetails.branch}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select your branch</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Information Technology">Information Technology</option>
            </select>
          </label>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={studentDetails.age}
              onChange={handleChange}
              required
            />
          </label>
          <button type="button" onClick={handleSignUp}>
            Sign Up
          </button>
        </form>

        {showWelcome && (
          <motion.div
            className="welcome-container"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Welcome, {studentDetails.name}!</h3>
            <p>
              We are excited to have you as a student in the {studentDetails.degree} program,
              specializing in {studentDetails.branch}. It's great that you are just {studentDetails.age} years old and already pursuing your dreams!
            </p>
          </motion.div>
        )}
      </div>

      {/* Image container with flip effect */}
      <div className={`image-container ${isFlipped ? 'flipped' : ''}`} onClick={handleImageClick}>
        <div className="flipper">
          <img
            className="front"
            src="https://d1sr9z1pdl3mb7.cloudfront.net/wp-content/uploads/2023/04/17185650/school-time-and-attendance-scaled.jpg"
            alt="Student Illustration"
          />
          <img
            className="back"
            src="https://th.bing.com/th/id/OIP.slRSxnXOr6TVHBcRRpVFeAHaEK?w=286&h=180&c=7&r=0&o=5&pid=1.7"
            alt="Second Image"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
