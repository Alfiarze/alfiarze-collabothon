import  { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, Paper, Box, CircularProgress, Alert } from '@mui/material';
import axiosPrivate from '../ctx/axiosPrivate';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const ContractList = () => {
  const [contracts, setContracts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axiosPrivate.get('api/contracts/')
      .then(response => {
        setContracts(response.data as any[]);
        setLoading(false);
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          setError('Contracts not found. The resource may have been moved or deleted.');
        } else {
          setError('An error occurred while fetching contracts. Please try again later.');
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert 
          severity="info" 
          icon={<InfoOutlinedIcon fontSize="inherit" />}
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            '& .MuiAlert-icon': {
              color: 'white',
            },
          }}
        >
          <Typography variant="body1" color="inherit">
            {error}
          </Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom align="center">Contracts</Typography>
      <Paper elevation={3}>
        {contracts.length > 0 ? (
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
        ) : (
          <Box p={3} textAlign="center">
            <Typography variant="body1">No contracts available</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ContractList;
