import { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper, Chip } from '@mui/material';
import axiosPrivate from '../../ctx/axiosPrivate';

interface LoanOffer {
  id: number;
  loan_amount: number;
  interest_rate: number;
  period: number;
  description: string;
  type: 'personal' | 'home' | 'emergency';
}

const LoanOffer = () => {
  const [loanOffers, setLoanOffers] = useState<LoanOffer[]>([
    { id: 1, loan_amount: 10000, interest_rate: 5, period: 12, description: "Personal loan with low interest rate", type: 'personal' },
    { id: 2, loan_amount: 25000, interest_rate: 7, period: 24, description: "Home improvement loan with flexible terms", type: 'home' },
    { id: 3, loan_amount: 5000, interest_rate: 10, period: 6, description: "Quick cash loan for emergencies", type: 'emergency' },
  ]);

  useEffect(() => {
    axiosPrivate.get('api/loan-offers/').then((res) => {
        console.log(res.data);
        if (Array.isArray(res.data)) {
            setLoanOffers(res.data.map((loanOffer: LoanOffer) => ({
                id: loanOffer.id,
                loan_amount: loanOffer.loan_amount,
                interest_rate: loanOffer.interest_rate,
                period: loanOffer.period,
                description: loanOffer.description,
                type: loanOffer.type
            })));
        }
    });
}, []);


  const getLoanTypeColor = (type: string): string => {
    switch (type) {
      case 'personal': return '#4caf50';
      case 'home': return '#2196f3';
      case 'emergency': return '#ff9800';
      default: return '#9e9e9e';
    }
  };

  return (
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
                        ${offer.loan_amount.toLocaleString()}
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
                      Interest Rate: {offer.interest_rate}% | Period: {offer.period} months
                    </Typography>
                    {` — ${offer.description}`}
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
  );
};

export default LoanOffer;
