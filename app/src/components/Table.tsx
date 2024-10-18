import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, List, ListItem, ListItemText, Paper, Box, CircularProgress } from '@mui/material';

const ContractList = () => {
  const [contracts, setContracts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/contracts/')
      .then(response => {
        setContracts(response.data as any[]);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  }

  if (error) {
    return <Typography color="error" align="center">Error: {error}</Typography>;
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom align="center">Contracts</Typography>
      <Paper elevation={3}>
        <List>
          {contracts.map(contract => (
            <ListItem key={contract.id} divider>
              <ListItemText
                primary={`${contract.contract_id} - ${contract.contract_type}`}
                secondary={`Amount: $${contract.amount}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ContractList;
