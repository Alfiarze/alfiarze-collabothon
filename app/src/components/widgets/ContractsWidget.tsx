import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import axiosPrivate from '../../ctx/axiosPrivate';
import { Link } from 'react-router-dom';
import {  Typography, List, ListItem, ListItemText, IconButton, CircularProgress } from '@mui/material';

interface ContractResponse {
    user_id: string;
    contract_id: string;
    contract_type: string;
    amount: number;
    start_date: string;
    end_date: string;
    status: string;
}

const ContractsWidget = (openWidget: boolean, setOpenWidget: (open: boolean) => void) => {
    const [contracts, setContracts] = useState<ContractResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchContracts();
    }, []);

    const fetchContracts = async () => {
        try {
            setLoading(true);
            const response = await axiosPrivate.get<ContractResponse[]>('api/contracts/');
            setContracts(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch contracts. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <>
            <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                Contracts
                <Link to="/add-contract">
                    <IconButton
                        color="primary"
                        aria-label="add contract"
                    >
                        <AddIcon />
                    </IconButton>
                </Link>
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
        </>
    );
};

export default ContractsWidget;
