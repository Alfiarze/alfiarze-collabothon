import React from 'react';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';

const Contracts = () => {
    const contracts = [
        { type: 'Electricity', provider: 'Power Co.', expiryDate: '2024-12-31', amount: 150 },
        { type: 'Rent', provider: 'Landlord Inc.', expiryDate: '2023-08-31', amount: 1200 },
        { type: 'Internet', provider: 'Web Connect', expiryDate: '2024-06-30', amount: 60 },
        { type: 'Water', provider: 'City Utilities', expiryDate: '2025-01-31', amount: 40 },
    ];

    return (
        <Paper elevation={3} sx={{ padding: 2, maxWidth: 400, margin: 'auto' }}>
            <Typography variant="h4" gutterBottom>
                Contracts
            </Typography>
            <List>
                {contracts.map((contract, index) => (
                    <ListItem key={index} divider={index !== contracts.length - 1}>
                        <ListItemText
                            primary={`${contract.type} - $${contract.amount}`}
                            secondary={`Provider: ${contract.provider} | Expires: ${contract.expiryDate}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default Contracts;
