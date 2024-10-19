import React from 'react';
import { Paper, Typography, Box, Container } from '@mui/material';

interface ShowQRCodeProps {
  qrCodeUrl: string;
  altText?: string;
}

const ShowQRCode: React.FC<ShowQRCodeProps> = ({ altText = 'QR Code' }) => {
  const qrCode = 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Qr-witaj-w-wikiped.svg';
  
  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, mt: 2, mb: 2 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h5" component="h2" gutterBottom>
            QR Code
          </Typography>
          <Box mb={2}>
            <img src={qrCode} alt={altText} style={{ width: '100%', maxWidth: 200, height: 'auto' }} />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ShowQRCode;
