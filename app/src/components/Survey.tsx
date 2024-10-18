import React, { useState } from 'react';

function Survey() {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>(['', '', '', '']);
    const [isCompleted, setIsCompleted] = useState(false);

    const questions = [
        {
            question: "What is your favorite color?",
            options: ["Red", "Blue", "Green", "Yellow"]
        },
        {
            question: "How old are you?",
            options: ["Under 18", "18-30", "31-50", "Over 50"]
        },
        {
            question: "What's your favorite hobby?",
            options: ["Reading", "Sports", "Music", "Gaming"]
        },
        {
            question: "Where would you like to travel next?",
            options: ["Europe", "Asia", "Africa", "Americas"]
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
            <button onClick={handleNextQuestion} disabled={!answers[questionIndex]}>
                {questionIndex === questions.length - 1 ? "Finish" : "Next question"}
            </button>
        </div>
    );
}

export default Survey;
