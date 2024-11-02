import React from 'react';

function Question({ question, questionIndex, options, selectedAnswer, onAnswer }) {
    const handleOptionChange = (event) => {
        onAnswer(questionIndex, event.target.value); // Update the selected answer for this question
    };

    return (
        <div className="question-container">
            <h2>{question}</h2>
            <div className="options-container">
                {options.map((option, index) => (
                    <div key={index} className="option">
                        <label>
                            <input
                                type="radio"
                                name={`question-${questionIndex}`}  // Group by question index
                                value={option}
                                checked={selectedAnswer === option}  // Check if it's the selected option
                                onChange={handleOptionChange}
                            />
                            {option}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Question;
