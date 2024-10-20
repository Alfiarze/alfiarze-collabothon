import { useEffect, useState } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import axiosPrivate from '../../ctx/axiosPrivate';

interface Payment {
  id: string;
  user: string;
  name: string;
  time: string;
  date: string;
  account_id: string;
}

const formatPaymentData = (payment: Payment) => ({
  primary: `User: ${payment.user} - Name: ${payment.name} - Account ID: ${payment.account_id}`,
  secondary: `Date: ${payment.date} - Time: ${payment.time}`,
});

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

  // Example data
  const examplePayments = [
    { id: '1', user: 'John Doe', name: 'Rent', time: '09:00', date: '2023-05-01', account_id: 'ACC001' },
    { id: '2', user: 'Jane Smith', name: 'Utilities', time: '14:30', date: '2023-05-03', account_id: 'ACC002' },
    { id: '3', user: 'Bob Johnson', name: 'Car Payment', time: '10:00', date: '2023-05-05', account_id: 'ACC003' },
  ];

  // For demonstration, replace the useEffect hook with this:
  useEffect(() => {
    //     const loadPayments = async () => {
    //   try {
    //     const data = await fetchUpcomingPayments();
    //     console.log('Fetched payments:', data); // Debugging line
    //     setPayments(Array.isArray(data) ? data : []);
    //   } catch (error) {
    //     setError((error as Error).message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // loadPayments();
    setPayments(examplePayments);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert 
          severity="error" 
          icon={<ErrorOutlineIcon fontSize="inherit" />}
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            '& .MuiAlert-icon': {
              color: 'white',
            },
          }}
        >
          <Typography variant="body1" color="inherit">
            Error: {error}
          </Typography>
        </Alert>
      </Box>
    );
  }

  if (payments.length === 0) {
    return (
      <Box p={3}>
        <Alert 
          severity="info"
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            '& .MuiAlert-icon': {
              color: 'white',
            },
          }}
        >
          <Typography variant="body1" color="inherit">
            No upcoming payments exist
          </Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h5" component="h2" gutterBottom>
        Upcoming Payments
      </Typography>
      <Paper elevation={3}>
        <List>
          {payments.map((payment) => {
            const { primary, secondary } = formatPaymentData(payment);
            return (
              <ListItem key={payment.id} divider>
                <ListItemText primary={primary} secondary={secondary} />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </Box>
  );
};

export default UpcomingPayments;
