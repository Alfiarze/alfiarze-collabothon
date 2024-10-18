import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

const ContractForm = () => {
  const initialValues = {
    id: '',
    contract_type: '',
    name: '',
    amount: '',
    start_date: '',
    end_date: '',
    status: '',
  };

  const validationSchema = Yup.object({
    id: Yup.string().required('Required'),
    contract_type: Yup.string().required('Required'),
    name: Yup.string().required('Required'),
    amount: Yup.number().required('Required').positive('Must be positive'),
    start_date: Yup.date().required('Required'),
    end_date: Yup.date().required('Required'),
    status: Yup.string().required('Required'),
  });

  const onSubmit = (values: typeof initialValues) => {
    console.log('Form data', values);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add Contract
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <Field
              as={TextField}
              label="ID"
              type="text"
              id="id"
              name="id"
              variant="outlined"
              fullWidth
              margin="normal"
              helperText={<ErrorMessage name="id" />}
            />

            <Field
              as={TextField}
              label="Contract Type"
              type="text"
              id="contract_type"
              name="contract_type"
              variant="outlined"
              fullWidth
              margin="normal"
              helperText={<ErrorMessage name="contract_type" />}
            />

            <Field
              as={TextField}
              label="Name"
              type="text"
              id="name"
              name="name"
              variant="outlined"
              fullWidth
              margin="normal"
              helperText={<ErrorMessage name="name" />}
            />

            <Field
              as={TextField}
              label="Amount"
              type="number"
              id="amount"
              name="amount"
              variant="outlined"
              fullWidth
              margin="normal"
              helperText={<ErrorMessage name="amount" />}
            />

            <Field
              as={TextField}
              label="Start Date"
              type="date"
              id="start_date"
              name="start_date"
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              helperText={<ErrorMessage name="start_date" />}
            />

            <Field
              as={TextField}
              label="End Date"
              type="date"
              id="end_date"
              name="end_date"
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              helperText={<ErrorMessage name="end_date" />}
            />

            <Field
              as={TextField}
              label="Status"
              type="text"
              id="status"
              name="status"
              variant="outlined"
              fullWidth
              margin="normal"
              helperText={<ErrorMessage name="status" />}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Submit
            </Button>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
};

export default ContractForm;