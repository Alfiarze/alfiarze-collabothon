import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, Paper, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axiosPrivate from '../../ctx/axiosPrivate';

interface ContractResponse {
    user_id: string;
    contract_id: string;
    contract_type: string;
    amount: number;
    start_date: string;
    end_date: string;
    status: string;
}

const Contracts = () => {
    const [contracts, setContracts] = useState<ContractResponse[]>([]);

    useEffect(() => {
        axiosPrivate.get<ContractResponse[]>('api/contracts/').then((res) => {
            setContracts(res.data);
        });
    }, []);

    return (
        <Paper elevation={3} sx={{ padding: 2, maxWidth: 400, margin: 'auto' }}>
            <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                Contracts
                <IconButton color="primary" aria-label="add contract">
                    <AddIcon />
                </IconButton>
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
