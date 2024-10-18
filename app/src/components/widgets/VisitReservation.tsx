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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

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
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleInitialSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Initial form submitted:', { topic, description });
        setIsSubmitted(true);
    };

    const handleFinalSubmit = () => {
        console.log('Final form submitted:', { selectedDate, selectedTime });
        setIsConfirmed(true);
    };

    const isDateValid = (date: Dayjs) => {
        return date.isAfter(dayjs(), 'day') || date.isSame(dayjs(), 'day');
    };

    const isTimeValid = (time: Dayjs) => {
        if (!selectedDate) return false;
        if (selectedDate.isAfter(dayjs(), 'day')) return true;
        return time.isAfter(dayjs());
    };

    if (isConfirmed && selectedDate && selectedTime) {
        const formattedDate = dayjs(selectedDate).format('MMMM D, YYYY');
        const formattedTime = dayjs(selectedTime).format('h:mm A');
        
        return (
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Consultation Confirmed
                    </Typography>
                    <Typography variant="body1">
                        A consultant will call you on {formattedDate} at {formattedTime}.
                    </Typography>
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                {!isSubmitted ? (
                    <Box component="form" onSubmit={handleInitialSubmit}>
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
                ) : (
                    <Box>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Choose Consultation Time
                        </Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Date"
                                value={selectedDate}
                                onChange={(newValue) => setSelectedDate(newValue)}
                                disablePast
                                shouldDisableDate={(date) => !isDateValid(date)}
                            />
                            <TimePicker
                                label="Time"
                                value={selectedTime}
                                onChange={(newValue) => setSelectedTime(newValue)}
                                disabled={!selectedDate}
                                shouldDisableTime={(time, view) => 
                                    view === 'hours' && !isTimeValid(time)
                                }
                            />
                        </LocalizationProvider>
                        <Button 
                            onClick={handleFinalSubmit} 
                            variant="contained" 
                            color="primary" 
                            fullWidth 
                            sx={{ mt: 2 }}
                            disabled={!selectedDate || !selectedTime}
                        >
                            Confirm
                        </Button>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default VisitReservation;
