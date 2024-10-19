import React, { useEffect, useState, useCallback } from 'react';
import { Typography, List, ListItem, ListItemText, Paper, Box, CircularProgress, Alert } from '@mui/material';
import axiosPrivate from '../../ctx/axiosPrivate';
import AddUpcomingPayment from './AddUpcomingPayment';
import { Payment } from '../../types/payment';

interface UpcomingPaymentsProps {
  onPaymentAdded: () => void;
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

const UpcomingPayments: React.FC<UpcomingPaymentsProps> = ({ onPaymentAdded }) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadPayments = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchUpcomingPayments();
      console.log('Fetched payments:', data); // Log fetched data
      setPayments(Array.isArray(data) ? data : []);
      setError(null);
    } catch (error) {
      console.error('Error fetching payments:', error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPayments();
  }, [loadPayments]);

  const handlePaymentAdded = useCallback(() => {
    console.log('Payment added, reloading payments...'); // Log when this function is called
    loadPayments();
    if (onPaymentAdded) {
      onPaymentAdded();
    }
  }, [loadPayments, onPaymentAdded]);

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
      <AddUpcomingPayment onPaymentAdded={handlePaymentAdded} />
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
