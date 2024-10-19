import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Snackbar } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axiosPrivate from '../../ctx/axiosPrivate';
import MuiAlert from '@mui/material/Alert';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  date: Yup.date().required('Required').nullable(),
  time: Yup.date().required('Required').nullable(),
  account_id: Yup.string().required('Required'),
});

const AddUpcomingPayment: React.FC = () => {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    try {
      const userId = 1; // Replace with your auth system's user ID retrieval logic
      const response = await axiosPrivate.post('api/upcoming-payments/', {
        ...values,
        user: userId,
        date: values.date ? values.date.format('YYYY-MM-DD') : null,
        time: values.time ? values.time.format('HH:mm:ss') : null,
      });
      console.log('Payment added:', response.data);
      resetForm();
      setSnackbarMessage('Payment added successfully!');
    } catch (error) {
      console.error('Error adding payment:', error);
      setSnackbarMessage('Error adding payment. Please try again.');
    }
    setSnackbarOpen(true);
    setSubmitting(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Formik
        initialValues={{ name: '', date: null, time: null, account_id: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form>
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
              <Field
                as={TextField}
                fullWidth
                name="name"
                label="Payment Name"
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />
              <DatePicker
                label="Date"
                onChange={(value) => setFieldValue('date', value)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: Boolean(touched.date && errors.date),
                    helperText: touched.date && errors.date,
                  },
                }}
              />
              <TimePicker
                label="Time"
                onChange={(value) => setFieldValue('time', value)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: Boolean(touched.time && errors.time),
                    helperText: touched.time && errors.time,
                  },
                }}
              />
              <Field
                as={TextField}
                fullWidth
                name="account_id"
                label="Account ID"
                error={touched.account_id && Boolean(errors.account_id)}
                helperText={touched.account_id && errors.account_id}
              />
              <Button type="submit" variant="contained" color="primary">
                Add Payment
              </Button>
            </Box>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
              <MuiAlert elevation={6} severity="info" onClose={handleSnackbarClose}>
                {snackbarMessage}
              </MuiAlert>
            </Snackbar>
          </Form>
        )}
      </Formik>
    </LocalizationProvider>
  );
};

export default AddUpcomingPayment;
