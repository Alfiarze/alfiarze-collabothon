import React, { useEffect, useState } from 'react';
import { Button, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box } from '@mui/material';

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
        currency: '',
        stock_exchange: '',
        loan_offers: '',
    });

    const questions = [
        {
            index: "answer_1",
            question: "What type of client are you?",
            options: ["Individual", "Company", "Organization"]
        },
        {
            index: "answer_2",
            question: "Do you use different currencies for your transactions?",
            options: ["Yes", "No"]
        },
        {
            index: "answer_3",
            question: "Do you use the stock exchange?",
            options: ["Yes", "No"]
        },
        {
            index: "answer_4",
            question: "Do you want loan offers?",
            options: ["Yes", "No"]
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
        setFormData({ ...formData, [questions[questionIndex].index]: e.target.value });
        setAnswers(newAnswers);
    };

    useEffect(() => {
        if (isCompleted) {
            const updatedFormData = {
                ...formData,
                layout: formData.answer_1 === "Individual" ? "1" : formData.answer_1 === "Company" ? "2" : "3",
                currency: formData.answer_2 === "Yes" ? "true" : "false",
                stock_exchange: formData.answer_3 === "Yes" ? "true" : "false",
                loan_offers: formData.answer_4 === "Yes" ? "true" : "false"
            };

            localStorage.setItem('surveyCompleted', 'true');
            localStorage.setItem('surveyData', JSON.stringify(updatedFormData));
            window.location.href = '/';
        }
    }, [isCompleted, formData]);

    if (isCompleted) {
        localStorage.setItem('surveyCompleted', 'true');
        window.location.href = '/';


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