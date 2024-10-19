import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import axiosPrivate from "../../ctx/axiosPrivate";

const ChatNav = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [message, setMessage] = useState<string>('');

    const handleSendMessage = (message: string) => {
        setMessages([...messages, message]);
        sendMessage();
    };

    const sendMessage = () => {
        axiosPrivate.post('api/ai-navigator/', { prompt: message }).then((response) => {
            if(response.status === 200) {
                let d = response.data;
                console.log(d);
                if(d.action === "redirect") {
                    window.location.href = d.path;
                }
            }
        }).catch((error) => {
            console.error('Error sending message:', error);
        });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Chat messages would go here */}
                <Box sx={{ flexGrow: 1 }}></Box>
            
            {/* Input area */}
            <Box sx={{ display: 'flex', padding: 2, alignItems: 'center' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Write down what you want to do at the bank"
                    size="small"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <IconButton color="primary" sx={{ ml: 1 }} onClick={() => handleSendMessage(message)}>
                    <SendIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

export default ChatNav;
