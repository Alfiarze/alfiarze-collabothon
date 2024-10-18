import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, Paper, Box, CircularProgress, Alert } from '@mui/material';
import axiosPrivate from '../../ctx/axiosPrivate';

interface Payment {
  id: string;
  user: string;
  name: string;
  time: string;
  date: string;
  account_id: string;
}

const formatPaymentData = (payment: Payment) => {
  return {
    primary: `User: ${payment.user} - Name: ${payment.name} - Account ID: ${payment.account_id}`,
    secondary: `Date: ${payment.date} - Time: ${payment.time}`
  };
};

const fetchUpcomingPayments = async (): Promise<Payment[]> => {
  try {
    const response = await axiosPrivate.get('api/upcoming-payments/');
    return response.data as Payment[];
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

const UpcomingPayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const data = await fetchUpcomingPayments();
        console.log('Fetched payments:', data); // Debugging line
        setPayments(Array.isArray(data) ? data : []);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, []);

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Box>;
  }

  if (error) {
    return <Alert severity="error">Error: {error}</Alert>;
  }

  if (payments.length === 0) {
    return <Alert severity="info">No upcoming payments exist</Alert>;
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom align="center">Upcoming Payments</Typography>
      <Paper elevation={3}>
        <List>
          {Array.isArray(payments) && payments.map(payment => {
            const { primary, secondary } = formatPaymentData(payment);
            return (
              <ListItem key={payment.id} divider>
                <ListItemText
                  primary={primary}
                  secondary={secondary}
                />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </Box>
  );
};

export default UpcomingPayments;
