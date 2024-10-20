import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import axiosPrivate from '../../ctx/axiosPrivate';
import { Link } from 'react-router-dom';
import {  Typography, List, ListItem, ListItemText, IconButton, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button, Box } from '@mui/material';
import { API_URL } from '../../ctx/conf';

interface ContractResponse {
    user_id: string;
    contract_id: string;
    contract_type: string;
    name: string;
    amount: number;
    start_date: string;
    end_date: string;
    status: string;
    file: string; // Add this new field
}

const ContractsWidget = () => {
    const [contracts, setContracts] = useState<ContractResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedContract, setSelectedContract] = useState<ContractResponse | null>(null);

    useEffect(() => {
        fetchContracts();
    }, []);

    const fetchContracts = async () => {
        try {
            setLoading(true);
            const response = await axiosPrivate.get<ContractResponse[]>('api/contracts/');
            console.log(response.data);
            setContracts(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch contracts. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleContractClick = (contract: ContractResponse) => {
        setSelectedContract(contract);
    };

    const handleCloseModal = () => {
        setSelectedContract(null);
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    const getNextPaymentDate = (startDate: string) => {
        const date = new Date(startDate); 
        date.setMonth(date.getMonth() + 1);
        return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    };

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
                    <ListItem 
                        key={index} 
                        divider={index !== contracts.length - 1}
                        onClick={() => handleContractClick(contract)}
                        sx={{ cursor: 'pointer' }}
                    >
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
                                    <br />
                                    {`Next payment date: ${getNextPaymentDate(contract.start_date)}`}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                ))}
            </List>

            <Dialog 
                open={selectedContract !== null} 
                onClose={handleCloseModal}
                maxWidth="md" // Increase dialog size to accommodate the image
                fullWidth
            >
                <DialogTitle>Contract Details</DialogTitle>
                <DialogContent>
                    {selectedContract && (
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                            <Box sx={{ flexBasis: '50%' }}>
                                <Typography variant="h6">{selectedContract.contract_type}</Typography>
                                <Typography>Name: {selectedContract.name}</Typography>
                                <Typography>Amount: ${selectedContract.amount}</Typography>
                                <Typography>Start Date: {selectedContract.start_date}</Typography>
                                <Typography>End Date: {selectedContract.end_date}</Typography>
                                <Typography>Status: {selectedContract.status}</Typography>
                                <Typography>Contract ID: {selectedContract.contract_id}</Typography>
                                <Typography>User ID: {selectedContract.user_id}</Typography>
                            </Box>
                            <Box sx={{ flexBasis: '50%' }}>
                                {selectedContract.file ? (
                                    <img 
                                        src={API_URL.slice(0, -1) + selectedContract.file} 
                                        alt="Contract" 
                                        style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'contain' }} 
                                    />
                                ) : (
                                    <Typography>No image available</Typography>
                                )}
                            </Box>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ContractsWidget;
