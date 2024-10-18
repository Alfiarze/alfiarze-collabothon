import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Paper, Typography, List, ListItem, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CallIcon from '@mui/icons-material/Call';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const CustomerService = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isChatStarted, setIsChatStarted] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            setMessages([...messages, inputMessage]);
            setInputMessage('');
            setIsChatStarted(true);
            setSelectedOption(null);
        }
    };

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
    };

    const supportOptions = [
        { icon: <QuestionAnswerIcon />, text: 'FAQ' },
        { icon: <ChatIcon />, text: 'Chat' },
        { icon: <CallIcon />, text: 'Call Support' },
    ];

    const getOptionContent = () => {
        switch (selectedOption) {
            case 'FAQ':
                return "Here are some frequently asked questions...";
            case 'Chat':
                return "What's your question?";
            case 'Call Support':
                return `Call us at: +48 857 191 091`;
            default:
                return null;
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4, height: '80vh', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" gutterBottom>
                Customer Service
            </Typography>
            <Paper elevation={3} sx={{ flexGrow: 1, overflow: 'auto', mb: 2, p: 2, display: 'flex', flexDirection: 'column-reverse' }}>
                {isChatStarted ? (
                    <>
                        <div ref={messagesEndRef} />
                        <List>
                            {messages.map((message, index) => (
                                <ListItem key={index} sx={{ justifyContent: 'flex-end' }}>
                                    <Paper elevation={1} sx={{ p: 1, bgcolor: 'primary.main', color: 'white', maxWidth: '80%' }}>
                                        <Typography variant="body2">{message}</Typography>
                                    </Paper>
                                </ListItem>
                            ))}
                        </List>
                    </>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                        {selectedOption ? (
                            <Typography variant="body1" align="center">
                                {getOptionContent()}
                            </Typography>
                        ) : (
                            <>
                                <Typography variant="h6" gutterBottom align="center">
                                    How can we help you today?
                                </Typography>
                                <List>
                                    {supportOptions.map((option, index) => (
                                        <ListItem key={index} sx={{ justifyContent: 'center' }}>
                                            <Paper 
                                                elevation={2} 
                                                sx={{ p: 2, width: '100%', textAlign: 'center', cursor: 'pointer' }}
                                                onClick={() => handleOptionClick(option.text)}
                                            >
                                                <IconButton color="primary" sx={{ mr: 1 }}>
                                                    {option.icon}
                                                </IconButton>
                                                <Typography variant="body1" component="span">
                                                    {option.text}
                                                </Typography>
                                            </Paper>
                                        </ListItem>
                                    ))}
                                </List>
                            </>
                        )}
                    </Box>
                )}
            </Paper>
            <Box sx={{ display: 'flex' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    sx={{ mr: 1 }}
                />
                <Button variant="contained" onClick={handleSendMessage}>
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default CustomerService;
