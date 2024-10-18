import React, { useState } from 'react';
import { 
    Box, 
    Typography, 
    TextField, 
    Button, 
    FormControl, 
    InputLabel, 
    Select, 
    MenuItem,
    Container,
    Paper
} from '@mui/material';

const topics = [
    'Account Issues',
    'Loans and Mortgages',
    'Investments',
    'Online Banking',
    'Other'
];

const VisitReservation = () => {
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [contactTime, setContactTime] = useState({ start: '', end: '' });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', { topic, description });
        
        // Set contact time to 1 hour from now
        const now = new Date();
        const startTime = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour later
        const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 2 hours later

        setContactTime({
            start: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            end: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        
        // Set form as submitted
        setIsSubmitted(true);
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                {isSubmitted ? (
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Thank you for your inquiry
                        </Typography>
                        <Typography variant="body1">
                            A consultant will contact you today between {contactTime.start} and {contactTime.end}.
                        </Typography>
                    </Box>
                ) : (
                    <Box component="form" onSubmit={handleSubmit}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Contact a Bank Consultant
                        </Typography>
                        
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="topic-select-label">Topic</InputLabel>
                            <Select
                                labelId="topic-select-label"
                                value={topic}
                                label="Topic"
                                onChange={(e) => setTopic(e.target.value)}
                                required
                            >
                                {topics.map((t) => (
                                    <MenuItem key={t} value={t}>{t}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {topic && (
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Describe your problem"
                                multiline
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        )}

                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary" 
                            fullWidth 
                            sx={{ mt: 2 }}
                            disabled={!topic || !description}
                        >
                            Send
                        </Button>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default VisitReservation;
