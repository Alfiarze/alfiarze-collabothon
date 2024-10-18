import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper, Chip } from '@mui/material';

interface Contract {
  id: string;
  name: string;
  category: 'energy' | 'housing' | 'other';
  end_date: string;
  amount: number;
  status: 'active' | 'pending' | 'expired';
}

const ContractsEnding: React.FC = () => {
  // Mock data - replace this with actual data fetching logic
  const contracts: Contract[] = [
    { id: '1', name: 'Electricity Plan', category: 'energy', end_date: '2023-12-31', amount: 120.50, status: 'active' },
    { id: '2', name: 'Apartment Lease', category: 'housing', end_date: '2023-11-15', amount: 1500.00, status: 'pending' },
    { id: '3', name: 'Internet Service', category: 'other', end_date: '2024-01-10', amount: 59.99, status: 'active' },
    { id: '4', name: 'Gas Plan', category: 'energy', end_date: '2023-10-31', amount: 80.00, status: 'expired' },
  ];

  const calculateDaysRemaining = (endDate: string): number => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getCategoryColor = (category: Contract['category']): string => {
    switch (category) {
      case 'energy': return '#4caf50';
      case 'housing': return '#2196f3';
      case 'other': return '#ff9800';
      default: return '#9e9e9e';
    }
  };

  const getStatusColor = (status: Contract['status']): string => {
    switch (status) {
      case 'active': return '#4caf50';
      case 'pending': return '#ff9800';
      case 'expired': return '#f44336';
      default: return '#9e9e9e';
    }
  };

  return (
    <Paper elevation={3}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Contracts and Bills Ending Soon
        </Typography>
        <List>
          {contracts.map((contract) => (
            <ListItem key={contract.id}>
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                      <Typography variant="subtitle1" component="span" mr={1}>
                        {contract.name}
                      </Typography>
                      <Chip
                        label={contract.category}
                        size="small"
                        sx={{ mr: 1, backgroundColor: getCategoryColor(contract.category), color: 'white' }}
                      />
                      <Chip
                        label={contract.status}
                        size="small"
                        sx={{ backgroundColor: getStatusColor(contract.status), color: 'white' }}
                      />
                    </Box>
                    <Typography variant="subtitle1" component="span">
                      ${contract.amount.toFixed(2)}
                    </Typography>
                  </Box>
                }
                secondary={`Expires in ${calculateDaysRemaining(contract.end_date)} days (${contract.end_date})`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default ContractsEnding;
