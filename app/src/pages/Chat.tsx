import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Typography, 
  Container,
  List,
  ListItem,
  Avatar,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import useWebSocket, { ReadyState } from 'react-use-websocket';

interface Message {
  text: string;
  isUser: boolean;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Replace with your actual WebSocket URL
  const socketUrl = 'ws://localhost:8000/ws/chat/';

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (lastMessage !== null) {
      const response = JSON.parse(lastMessage.data);
      setMessages(prev => [...prev, { text: response.message, isUser: false }]);
    }
  }, [lastMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = useCallback(() => {
    if (input.trim() && readyState === ReadyState.OPEN) {
      sendMessage(JSON.stringify({ message: input }));
      setMessages(prev => [...prev, { text: input, isUser: true }]);
      setInput('');
    }
  }, [input, sendMessage, readyState]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ height: '80vh', display: 'flex', flexDirection: 'column', mt: 4 }}>
        <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
          <Typography variant="body2">WebSocket Status: {connectionStatus}</Typography>
        </Box>
        <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
          <List>
            {messages.map((message, index) => (
              <ListItem key={index} sx={{ justifyContent: message.isUser ? 'flex-end' : 'flex-start' }}>
                <Box sx={{ display: 'flex', flexDirection: message.isUser ? 'row-reverse' : 'row', alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: message.isUser ? 'primary.main' : 'secondary.main', m: 1 }}>
                    {message.isUser ? 'U' : 'AI'}
                  </Avatar>
                  <Paper elevation={1} sx={{ p: 2, maxWidth: '70%', bgcolor: message.isUser ? 'primary.light' : 'secondary.light' }}>
                    <Typography variant="body1">{message.text}</Typography>
                  </Paper>
                </Box>
              </ListItem>
            ))}
          </List>
          <div ref={messagesEndRef} />
        </Box>
        <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            InputProps={{
              endAdornment: (
                <Button
                  color="primary"
                  onClick={handleSend}
                  disabled={!input.trim() || readyState !== ReadyState.OPEN}
                >
                  <SendIcon />
                </Button>
              ),
            }}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default Chat;
