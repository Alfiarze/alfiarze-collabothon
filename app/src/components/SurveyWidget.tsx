import { Button } from '@mui/material';
import React, { useState } from 'react';

function Survey() {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>(['', '', '', '']);
    const [isCompleted, setIsCompleted] = useState(false);

    const questions = [
        {
            question: "What type of client are you?",
            options: ["Individual", "Company", "Organization"]
        },
        {
            question: "Do you use different currencies for your transactions?",
            options: ["Yes", "No"]
        },
        {
            question: "Do you use the stock exchange?",
            options: ["Yes", "No"]
        },
        {
            question: "Are you using different types of accounts?",
            options: ["No", "Savings", "Joint account", "Other"]
        }
    ];

    const handleNextQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevent default form submission
        if (questionIndex < questions.length - 1) {
            setQuestionIndex(questionIndex + 1);
        } else {
            setIsCompleted(true);
        }
    };

    const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = e.target.value;
        setAnswers(newAnswers);
    };

    if (isCompleted) {
        return (
            <div>
                <h2>Thank you for completing the survey!</h2>
            </div>
        );
    }

    return (
        <div>
            <h1>Survey</h1>
            <h2>{questions[questionIndex].question}</h2>
            <form>
                {questions[questionIndex].options.map((option, index) => (
                    <div key={index}>
                        <input
                            type="radio"
                            id={`option-${index}`}
                            name={`question-${questionIndex}`}
                            value={option}
                            checked={answers[questionIndex] === option}
                            onChange={handleAnswerChange}
                        />
                        <label htmlFor={`option-${index}`}>{option}</label>
                    </div>
                ))}
            </form>

            <Button variant="contained" onClick={handleNextQuestion} disabled={!answers[questionIndex]}>{questionIndex === questions.length - 1 ? "Finish" : "Next question"}</Button>
        </div>
    );
}

export default Survey;
