import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper, Chip } from '@mui/material';

interface LoanOffer {
  id: number;
  amount: number;
  instalment: number;
  description: string;
  type: 'personal' | 'home' | 'emergency';
}

const loanOffers: LoanOffer[] = [
  { id: 1, amount: 10000, instalment: 500, description: "Personal loan with low interest rate", type: 'personal' },
  { id: 2, amount: 25000, instalment: 1000, description: "Home improvement loan with flexible terms", type: 'home' },
  { id: 3, amount: 5000, instalment: 250, description: "Quick cash loan for emergencies", type: 'emergency' },
];

const Credit: React.FC = () => {
  const getLoanTypeColor = (type: LoanOffer['type']): string => {
    switch (type) {
      case 'personal': return '#4caf50';
      case 'home': return '#2196f3';
      case 'emergency': return '#ff9800';
      default: return '#9e9e9e';
    }
  };

  return (
    <Paper elevation={3}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" component="h2" mb={2}>
          Loan Offers
        </Typography>
        <List>
          {loanOffers.map((offer) => (
            <ListItem key={offer.id}>
              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                      <Typography variant="subtitle1" component="span" mr={1}>
                        ${offer.amount.toLocaleString()}
                      </Typography>
                      <Chip
                        label={offer.type}
                        size="small"
                        sx={{ backgroundColor: getLoanTypeColor(offer.type), color: 'white' }}
                      />
                    </Box>
                    <Typography variant="subtitle1" component="span">
                      {offer.type.charAt(0).toUpperCase() + offer.type.slice(1)} Loan
                    </Typography>
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography component="span" variant="body2" color="text.primary">
                      ${offer.instalment}/month
                    </Typography>
                    {` — ${offer.description}`}
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default Credit;
