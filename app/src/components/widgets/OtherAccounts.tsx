import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper, Chip, IconButton } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axiosPrivate from '../../ctx/axiosPrivate';

interface OtherAccounts {
  id: number;
  name: string;
  balance: number;
  type: 'savings' | 'checking' | 'investment';
  lastTransaction: string;
}

const OtherAccounts = () => {
  const [accounts, setAccounts] = useState<OtherAccounts[]>([
    { id: 1, name: 'Savings Account', balance: 5000, type: 'savings', lastTransaction: '2023-05-15' },
    { id: 2, name: 'Checking Account', balance: 2500, type: 'checking', lastTransaction: '2023-05-20' },
    { id: 3, name: 'Investment Account', balance: 10000, type: 'investment', lastTransaction: '2023-05-10' },
  ]);

  useEffect(() => {
    axiosPrivate.get('api/commerzbank/accounts/').then((res) => {
        console.log(res.data);

        // if (Array.isArray(res.data)) {
        //     setAccounts(res.data.map((account: Account) => ({
 
        //     })));
        // }
    });
}, []);

  const [showBalances, setShowBalances] = useState<boolean>(false);

  const getAccountTypeColor = (type: OtherAccounts['type']): string => {
    switch (type) {
      case 'savings': return '#4caf50';
      case 'checking': return '#2196f3';
      case 'investment': return '#ff9800';
      default: return '#9e9e9e';
    }
  };

  const calculateDaysSinceLastTransaction = (lastTransaction: string): number => {
    const today = new Date();
    const lastTx = new Date(lastTransaction);
    const diffTime = today.getTime() - lastTx.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const toggleBalances = () => {
    setShowBalances(!showBalances);
  };

  return (
      <Box sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h5" component="h2">
            Other Accounts
          </Typography>
          <IconButton onClick={toggleBalances} size="small">
            {showBalances ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </Box>
        <List>
          {accounts.map((account) => (
            <ListItem key={account.id}>
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                      <Typography variant="subtitle1" component="span" mr={1}>
                        {account.name}
                      </Typography>
                      <Chip
                        label={account.type}
                        size="small"
                        sx={{ backgroundColor: getAccountTypeColor(account.type), color: 'white' }}
                      />
                    </Box>
                    <Typography variant="subtitle1" component="span">
                      {showBalances ? `$${account.balance.toFixed(2)}` : '$********'}
                    </Typography>
                  </Box>
                }
                secondary={`Last transaction ${calculateDaysSinceLastTransaction(account.lastTransaction)} days ago (${account.lastTransaction})`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
  );
};

export default OtherAccounts;
