import React from "react";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

interface AccountData {
  id: number;
  user_name: string;
  account_number: string;
  balance: number;
}

const BankBalance: React.FC = () => {
  // Example account data
  const accounts: AccountData[] = [
    {
      id: 1,
      user_name: "John Doe",
      account_number: "1234567890",
      balance: 5000.75
    },
  ];

  return (
    <div>
      <Typography variant="h5" component="h2" gutterBottom>
        Your Bank Accounts
      </Typography>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {accounts.map((account, index) => (
          <React.Fragment key={account.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>
                  <AccountBalanceIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={account.user_name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: 'text.primary', display: 'block' }}
                    >
                      Account Number
                    </Typography>
                    {`**** **** ${account.account_number.slice(-4)}`}
                    <br />
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: 'text.primary', display: 'block', mt: 1 }}
                    >
                      Balance
                    </Typography>
                    {`$${account.balance.toFixed(2)}`}
                  </React.Fragment>
                }
              />
            </ListItem>
            {index < accounts.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default BankBalance;
