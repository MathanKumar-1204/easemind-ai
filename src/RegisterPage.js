import React, { useState } from 'react';
import './Loginreg.css'; // Assuming the CSS file is named LoginPage.css
import { getDatabase, ref, set } from "firebase/database";


const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    // Reference to the user's credentials in the database
    const db = getDatabase();
    const userRef = ref(db,   `Login/${username}`);
    
    set(userRef, password).then(() => {
      alert("Registration successful!");
      // Redirect or reset form
    }).catch((error) => {
      console.error("Error registering user:", error);
      alert("An error occurred. Please try again.");
    });
  };

  return (
    <div className="login-container">
      <div className="logo">
        <br /><br /><br />
        <h1>Ease Mind</h1>
        <p>Mental wellness, Simplified</p>
      </div>
      <div className="creds">
        <form id="RegisterForm" onSubmit={handleSubmit}>
          <h1><b>Register</b></h1>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="pwd">Password</label>
          <input
            type="password"
            placeholder="Enter your Password"
            id="pwd"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="cpwd">Confirm Password</label>
          <input
            type="password"
            placeholder="Enter your Confirm Password"
            id="cpwd"
            name="confirm_password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        <h1><b>Already an existing user?</b></h1>
        <p style={{ textAlign: 'center' }}>
          <a href="/">
            <button type="button">Login</button>
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;