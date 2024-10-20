import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import axiosPublic from "../../ctx/axiosPublic";
import { useHistory } from 'react-router-dom';


// Define the response type
interface AIResponse {
    additional_info: object;
    action: string;
    path?: string;
}

const ChatNav = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [message, setMessage] = useState<string>('');

    const handleSendMessage = (message: string) => {
        setMessages([...messages, message]);
        sendMessage();
    };

    const history = useHistory();

    const sendMessage = () => {
        axiosPublic.post<AIResponse>('api/ai-navigator/', { prompt: message }).then((response) => {
            if(response.status === 200) {
                let d = response.data;
                console.log(d);
                if(d.additional_info && d.path){
                    // Create URLSearchParams object
                    const queryParams = new URLSearchParams();
                    
                    // Iterate through additional_info properties
                    for (const [key, value] of Object.entries(d.additional_info)) {
                        if (value !== '') {
                            queryParams.append(key, value.toString());
                        }
                    }
                    
                    const fullPath = `${d.path}?${queryParams.toString()}`;
                    history.push(fullPath);
                } else if(d.action === "redirect" && d.path) {
                    history.push(d.path);
                }
            }
        }).catch((error) => {
            console.error('Error sending message:', error);
        });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ flexGrow: 1 }}></Box>
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
