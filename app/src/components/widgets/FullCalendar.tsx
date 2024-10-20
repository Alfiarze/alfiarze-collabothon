import  { useState, useEffect } from 'react';
import FullCalendarLib from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Paper, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

const FullCalendar = () => {
    const [events, setEvents] = useState([
        { title: 'Event 1', date: '2024-10-01' },
        { title: 'Alfiarze wygrywają konkurs', date: '2024-10-20' },
    ]);
    const [openDialog, setOpenDialog] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', date: '' });

    const setEventOnDay = (date: string, title: string) => {
        const newEvent = { title, date };
        setEvents(prevEvents => [...prevEvents, newEvent]);
    };

    const handleDateClick = (arg: any) => {
        setNewEvent({ title: '', date: arg.dateStr });
        setOpenDialog(true);
    };

    const handleAddEvent = () => {
        if (newEvent.title) {
            setEventOnDay(newEvent.date, newEvent.title);
            setOpenDialog(false);
        }
    };

    // Add this useEffect hook to set some sample events
    useEffect(() => {
        setEventOnDay('2023-04-10', 'Sample Event 1');
        setEventOnDay('2023-04-20', 'Sample Event 2');
        setEventOnDay('2023-04-25', 'Sample Event 3');
    }, []);

    return (
        <div style={{ height: '300px', width: '100%' }}>
            <FullCalendarLib
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                dateClick={handleDateClick}
                headerToolbar={{
                    left: 'title',
                    right: 'prev,next',
                }}
                height="100%"
                contentHeight="auto"
                aspectRatio={1.35}
                dayMaxEvents={2}
                eventDisplay="block"
            />
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Add New Event</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Event Title"
                        fullWidth
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddEvent}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default FullCalendar;
