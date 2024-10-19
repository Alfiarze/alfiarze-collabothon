import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import axiosPrivate from '../../ctx/axiosPrivate';

// Define the Transfer interface directly in this file for now
interface Transfer {
  id: number;
  account_id: string;
  transaction_name: string;
  from_account: string;
  to_account: string;
  amount: number;
  categories: string[];
  date: string; // Added date field
}

const RecentTransfersList: React.FC = () => {
  const [transfers, setTransfers] = useState<Transfer[]>([
    { id: 1, account_id: 'ACC001', transaction_name: 'Salary Deposit', from_account: 'ACME Corp', to_account: 'My Checking', amount: 3500, categories: ['incoming', 'salary'], date: '2023-04-15' },
    { id: 2, account_id: 'ACC001', transaction_name: 'Rent Payment', from_account: 'My Checking', to_account: 'Landlord LLC', amount: 1200, categories: ['outgoing', 'housing'], date: '2023-04-02' },
    { id: 3, account_id: 'ACC002', transaction_name: 'Grocery Shopping', from_account: 'My Credit Card', to_account: 'Supermarket', amount: 85.50, categories: ['outgoing', 'food'], date: '2023-04-10' },
    { id: 4, account_id: 'ACC001', transaction_name: 'Freelance Payment', from_account: 'Client XYZ', to_account: 'My Savings', amount: 750, categories: ['incoming', 'freelance'], date: '2023-04-08' },
  ]);

  useEffect(() => {
    axiosPrivate.get('api/transactions/').then((res) => {
      console.log(res.data);
      if (Array.isArray(res.data)) {
        setTransfers(res.data.map((transaction: Transfer) => ({
          ...transaction,
          date: new Date().toLocaleDateString(), // Add a placeholder date
        })));
      }
    });
  }, []);

  return (
    <div>
      <Typography variant="h5" component="h2" gutterBottom>
        Recent Transfers
      </Typography>
      
      <List>
        {transfers.map((transfer) => (
          <ListItem key={transfer.id}>
            <ListItemAvatar>
              {transfer.categories.includes('incoming') ? (
                <AddCircleIcon color="success" fontSize="large" />
              ) : (
                <RemoveCircleIcon color="error" fontSize="large" />
              )}
            </ListItemAvatar>
            <ListItemText
              primary={`${transfer.transaction_name} - ${transfer.from_account}`}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="text.primary">
                    {transfer.categories.includes('incoming') ? '+' : '-'}${transfer.amount.toFixed(2)}
                  </Typography>
                  {` | ${new Date(transfer.date).toLocaleDateString()}`}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default RecentTransfersList;
