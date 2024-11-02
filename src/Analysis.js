import React, { useState } from 'react';
import './form.css';
import Question from './Question';
import { useNavigate } from 'react-router-dom';

const questions = [
    "How often do you find it difficult to relax?",
    "How often do you feel furious?",
    "Do you often feel unable to experience any positive feelings?",
    "Have you experienced difficulty in breathing without any clear reason?",
    "Do you struggle to find the motivation to start tasks?",
    "Do you tend to over-react to situations?",
    "How often do you feel like you're using a lot of nervous energy?",
    "Are you frequently worried about situations where you might panic?",
    "Do you feel downhearted and blue?",
    "Do you experience dizziness without any clear reason?",
    "Do you feel like you're close to panic?",
    "Are you aware of the action of your heart even when not exerting yourself?",
    "Do you feel that you are emotionally over-reacting?",
    "Do you feel like everything is moving too fast?",
    "Do you find it hard to concentrate?",
    "Do you feel that you don't want to socialize?",
    "Do you worry about situations that haven't happened yet?"
];

const options = ['Never', 'Rarely', 'Sometimes', 'Often', 'Always']; // Answer options

function Analysis() {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null)); // Array to hold answers

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleAnswerChange = (index, answer) => {
        const newAnswers = [...answers];
        newAnswers[index] = answer;  // Update the answer for the current question
        setAnswers(newAnswers);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:5000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answers }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            // Assuming your backend returns a prediction or result that you want to pass to the next page
            navigate("/main", { state: { prediction: data.prediction } }); // Pass the prediction if applicable
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was a problem with your submission. Please try again.'); // User feedback for errors
        });
    };
    

    return (
        <div>
            <video autoPlay loop muted id="background-video">
                <source src="/stars.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            
            <div className="overlay"></div> {/* Overlay with blur */}
            
            <div className="container">
                <h1 className="title">Can you tell us a bit about yourself?</h1>
                <form id="stressForm" onSubmit={handleSubmit}>
                    <Question
                        question={questions[currentQuestion]}
                        questionIndex={currentQuestion}
                        options={options}  // Pass options to the Question component
                        selectedAnswer={answers[currentQuestion]} // Pass the selected answer
                        onAnswer={handleAnswerChange} // Handle the answer change
                    />
                    <div className="navigation-buttons">
                        <button
                            type="button"
                            id="prevBtn"
                            onClick={handlePrev}
                            style={{ display: currentQuestion === 0 ? 'none' : 'inline-block' }}
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            id="nextBtn"
                            onClick={handleNext}
                            style={{ display: currentQuestion === questions.length - 1 ? 'none' : 'inline-block' }}
                        >
                            Next
                        </button>
                    </div>
                    {currentQuestion === questions.length - 1 && (
                        <div className="submit-button">
                            <input type="submit" value="Submit"/>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Analysis;
