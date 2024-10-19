import React, { useState } from 'react';
import { Button, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box } from '@mui/material';
import axiosPrivate from '../ctx/axiosPrivate';
import { useUser } from '../context/UserContext';

function Survey() {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<string[]>(['', '', '', '']);
    const [isCompleted, setIsCompleted] = useState(false);
    const [formData, setFormData] = useState({
        answer_1: '',
        answer_2: '',
        answer_3: '',
        answer_4: '',
        result: "kmk",
        layout: '',
    });

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
        setFormData({ ...formData, [questions[questionIndex].question]: e.target.value });
        setAnswers(newAnswers);
    };

    if (isCompleted) {
        axiosPrivate.post('/api/userLayout/', formData).then(() => {
            window.location.href = '/';
        }).catch((error) => {
            console.error('Error submitting survey:', error);
        });
        return (
            <Box sx={{
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                padding: '16px',
                maxWidth: '400px',
                margin: 'auto',
                backgroundColor: '#ffffff',
            }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
                    Thank you for completing the survey!
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            padding: '16px',
            maxWidth: '400px',
            margin: 'auto',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '400px', // Adjust this value as needed
        }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
                Survey
            </Typography>
            <FormControl component="fieldset" sx={{ flexGrow: 1 }}>
                <FormLabel component="legend">
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
                        {questions[questionIndex].question}
                    </Typography>
                </FormLabel>
                <RadioGroup
                    value={answers[questionIndex]}
                    onChange={handleAnswerChange}
                >
                    {questions[questionIndex].options.map((option, index) => (
                        <FormControlLabel
                            key={index}
                            value={option}
                            control={<Radio />}
                            label={<Typography variant="body1">{option}</Typography>}
                            sx={{ marginBottom: '8px' }}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
            <Box sx={{ marginTop: 'auto', textAlign: 'right' }}>
                <Button 
                    variant="contained" 
                    onClick={handleNextQuestion} 
                    disabled={!answers[questionIndex]}
                >
                    {questionIndex === questions.length - 1 ? "Finish" : "Next question"}
                </Button>
            </Box>
        </Box>
    );
}

export default Survey;
