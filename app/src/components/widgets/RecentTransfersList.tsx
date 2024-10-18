import React from 'react';
import { List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

// Define the Transfer interface directly in this file for now
interface Transfer {
  id: number;
  recipient: string;
  amount: number;
  date: string;
  type: 'incoming' | 'outgoing';
}

// Mock data for recent transfers
const mockTransfers: Transfer[] = [
  { id: 1, recipient: 'John Doe', amount: 100, date: '2023-04-15', type: 'incoming' },
  { id: 2, recipient: 'Jane Smith', amount: 250, date: '2023-04-14', type: 'outgoing' },
  { id: 3, recipient: 'Bob Johnson', amount: 75, date: '2023-04-13', type: 'incoming' },
  { id: 4, recipient: 'Alice Brown', amount: 150, date: '2023-04-12', type: 'outgoing' },
];

const RecentTransfersList: React.FC = () => {
  return (
    <div>
      <h1>Recent Transfers</h1>
      <List>
        {mockTransfers.map((transfer) => (
          <ListItem key={transfer.id}>
            <ListItemAvatar>
              {transfer.type === 'incoming' ? (
                <AddCircleIcon color="success" fontSize="large" />
              ) : (
                <RemoveCircleIcon color="error" fontSize="large" />
              )}
            </ListItemAvatar>
            <ListItemText
              primary={transfer.recipient}
              secondary={`${transfer.type === 'incoming' ? '+' : '-'}$${transfer.amount} - ${transfer.date}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default RecentTransfersList;
