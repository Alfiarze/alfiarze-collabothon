import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';

interface Payment {
  id: string;
  amount: number;
  dueDate: Date;
  description: string;
}

interface UpcomingPaymentProps {
  payments?: Payment[];
}

const UpcomingPayment: React.FC<UpcomingPaymentProps> = ({ payments }) => {
  const defaultPayments: Payment[] = [
    {
      id: '1',
      amount: 100.50,
      dueDate: new Date('2023-05-15'),
      description: 'Electricity Bill',
    },
    {
      id: '2',
      amount: 50.00,
      dueDate: new Date('2023-05-20'),
      description: 'Internet Subscription',
    },
    // Add more sample payments as needed
  ];

  const paymentData = payments || defaultPayments;

  return (
    <Box sx={{ p: 4, bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2, fontFamily: 'Roboto, sans-serif' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Upcoming Payments
      </Typography>
      {paymentData.map((payment) => (
        <Card key={payment.id} sx={{ mb: 2 }}>
          <CardContent>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={8}>
                <Typography variant="h6" component="p">
                  {payment.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Due Date: {payment.dueDate.toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={4} textAlign="right">
                <Typography variant="h6" component="p">
                  ${payment.amount.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default UpcomingPayment;

// Example usage:
const samplePayments: Payment[] = [
  {
    id: '1',
    amount: 100.50,
    dueDate: new Date('2023-05-15'),
    description: 'Electricity Bill',
  },
  {
    id: '2',
    amount: 50.00,
    dueDate: new Date('2023-05-20'),
    description: 'Internet Subscription',
  },
  // Add more sample payments as needed
];

// Use the component like this:
// <UpcomingPayment payments={samplePayments} />
