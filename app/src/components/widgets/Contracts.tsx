import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, Paper } from '@mui/material';
import axiosPrivate from '../../ctx/axiosPrivate';

const Contracts = () => {
    const [contracts, setContracts] = useState([
        { contract_type: 'Electricity', provider: 'Power Co.', expiryDate: '2024-12-31', amount: 150 },
        { contract_type: 'Rent', provider: 'Landlord Inc.', expiryDate: '2023-08-31', amount: 1200 },
        { contract_type: 'Internet', provider: 'Web Connect', expiryDate: '2024-06-30', amount: 60 },
        { contract_type: 'Water', provider: 'City Utilities', expiryDate: '2025-01-31', amount: 40 },
    ]);

    useEffect(() => {
        axiosPrivate.get('api/contracts/').then((res) => {
            console.log(res.data);
            setContracts(res.data.map((contract: any) => ({
                user_id: contract.user_id,
                contract_id: contract.contract_id,
                contract_type: contract.contract_type,
                amount: contract.amount,
                start_date: contract.start_date,
                end_date: contract.end_date,
                status: contract.status
            })));
        });
    }, []);

    return (
        <Paper elevation={3} sx={{ padding: 2, maxWidth: 400, margin: 'auto' }}>
            <Typography variant="h4" gutterBottom>
                Contracts
            </Typography>
            <List>
                {contracts.map((contract, index) => (
                    <ListItem key={index} divider={index !== contracts.length - 1}>
                        <ListItemText
                            primary={`${contract.contract_type} - $${contract.amount}`}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        sx={{ color: 'text.primary', display: 'block' }}
                                    >
                                    </Typography>
                                    {`Start: ${contract.start_date} | Expires: ${contract.end_date}`}
                                    <br />
                                    {`Status: ${contract.status}`}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default Contracts;
