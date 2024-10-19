import { useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Box, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import PhotoIcon from '@mui/icons-material/Photo';

const StyledCard = styled(Card)({
  maxWidth: 400,
  margin: 'auto',
});

const PhotoPlaceholder = styled(Box)({
  width: '100%',
  height: 'auto', //edit if needed
  backgroundColor: '#f0f0f0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 16,
});

const ReceiptWidget = () => {
    const [showPhoto, setShowPhoto] = useState(false);

    const receiptData = {
        date: new Date().toLocaleDateString(),
        storeName: 'Sample Store',
        items: [
            { name: 'Item 1', price: 10.99 },
            { name: 'Item 2', price: 15.50 },
            { name: 'Item 3', price: 5.99 },
        ],
        nip: '1234567890',
    };

    const totalPrice = receiptData.items.reduce((sum, item) => sum + item.price, 0);

    const togglePhoto = () => {
        setShowPhoto(!showPhoto);
    };

    return (
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h5" component="div">
                        Receipt
                    </Typography>
                    <IconButton onClick={togglePhoto} color={showPhoto ? "primary" : "default"}>
                        <PhotoIcon />
                    </IconButton>
                </Box>
                {showPhoto && (
                    <PhotoPlaceholder>
                        <Typography>Photo Placeholder</Typography>
                    </PhotoPlaceholder>
                )}
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    Date: {receiptData.date}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {receiptData.storeName}
                </Typography>
                <List>
                    {receiptData.items.map((item, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemText 
                                primary={item.name} 
                                secondary={`$${item.price.toFixed(2)}`} 
                            />
                        </ListItem>
                    ))}
                </List>
                <Typography variant="h6" gutterBottom>
                    Total: ${totalPrice.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    NIP: {receiptData.nip}
                </Typography>
            </CardContent>
    );
};

export default ReceiptWidget;
