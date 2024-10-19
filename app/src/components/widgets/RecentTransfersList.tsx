import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';
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
}

// Mock data for recent transfers
const Transfer = () => {
  const [transfers, setTransfers] = useState<Transfer[]>([
    { id: 1, account_id: '1', transaction_name: 'Transfer 1', from_account: 'John Doe', to_account: 'Account 1', amount: 100, categories: ['incoming'] },
    { id: 2, account_id: '2', transaction_name: 'Transfer 2', from_account: 'Jane Smith', to_account: 'Account 2', amount: 250, categories: ['outgoing'] },
    { id: 3, account_id: '3', transaction_name: 'Transfer 3', from_account: 'Bob Johnson', to_account: 'Account 3', amount: 75, categories: ['incoming'] },
    { id: 4, account_id: '4', transaction_name: 'Transfer 4', from_account: 'Alice Brown', to_account: 'Account 4', amount: 150, categories: ['outgoing'] },
  ]);

useEffect(() => {
  axiosPrivate.get('api/transactions/').then((res) => {
      console.log(res.data);
      if (Array.isArray(res.data)) {
        setTransfers(res.data.map((transaction: Transfer) => ({
          id: transaction.id,
          account_id: transaction.account_id,
          transaction_name: transaction.transaction_name,
          from_account: transaction.from_account,
          to_account: transaction.to_account,
          amount: transaction.amount,
          categories: transaction.categories,
          })));
      }
  });
}, []);

  return (
    <div>
      <h1>Recent Transfers</h1>
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
              primary={transfer.from_account}
              secondary={`${transfer.categories.includes('incoming') ? '+' : '-'}$${transfer.amount} | ${transfer.date}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};


export default Transfer;
