import React, { useState } from 'react';
import './Loginreg.css'; // Import your CSS file
import { database } from './firebase'; // Import Firebase database
import { ref, get, child } from "firebase/database"; // Import required functions from firebase
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate(); // Initialize the navigate function

    const handleSubmit = (event) => {
        event.preventDefault();

        // Reference to the user's credentials in the database
        const dbRef = ref(database);
        
        get(child(dbRef, `Login/${username}`)).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                // Check if password matches
                if (data === password) {
                    Swal.fire({
                        title: "SUCCESS!",
                        text: "You have logged in!",
                        icon: "success"
                    }).then(() => {
                        navigate("/analyse"); // Navigate after the success alert
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "WRONG CREDENTIALS!!",
                    });
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Username not found. Please try again.",
                });
            }
        }).catch((error) => {
            console.error("Error fetching data:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "An error occurred. Please try again.",
            });
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
                <form id="loginForm" onSubmit={handleSubmit}>
                    <h1><b>LOGIN</b></h1>
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
                    <button type="submit">Login</button>
                </form>
                <h1><b>Don't have an account?</b></h1>
                <p style={{ textAlign: 'center' }}>
                    <a href="/register">
                        <button>Register</button>
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;