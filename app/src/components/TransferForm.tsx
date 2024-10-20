import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Typography, Container, Snackbar, FormControlLabel, Checkbox } from '@mui/material';
import { useState, useEffect } from 'react';
import { Formik, Form,  useField } from 'formik';
import * as Yup from 'yup';
import axiosPrivate from '../ctx/axiosPrivate';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';

const TransferForm = () => {
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });
    const [isDarkListAccount, setIsDarkListAccount] = useState(false);
    const [darkListConfirmed, setDarkListConfirmed] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const location = useLocation();

    // Function to parse query parameters
    const getQueryParam = (param: string) => {
        const searchParams = new URLSearchParams(location.search);
        return searchParams.get(param) || '';
    };

    // Remove the formData state and useEffect
    // const [formData, setFormData] = useState({ ... });
    // useEffect(() => { ... }, [params]);

    // Instead, create an initial values object based on URL params
    const initialValues = {
        title: getQueryParam('title'),
        receiver: getQueryParam('receiver'),
        receiver_address: getQueryParam('receiver_address'),
        account_number: getQueryParam('account_number'),
        amount: getQueryParam('amount'),
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Required'),
        receiver: Yup.string().required('Required'),
        receiver_address: Yup.string().required('Required'),
        account_number: Yup.string()
          .matches(/^\d{26}$/, 'Must be exactly 26 digits')
          .required('Required'),
        amount: Yup.number().required('Required').positive('Must be positive'),
      });

    const exampleAccounts = [
        '11111111111111111111111111',
        '00000000000000000000000000',
        '22222222222222222222222222',
    ];

    // Custom input component for all text fields
    const CustomTextField = ({ ...props }) => {
        const [field, meta] = useField(props);
        
        return (
            <TextField
                {...field}
                {...props}
                error={meta.touched && Boolean(meta.error)}
                helperText={meta.touched && meta.error}
                fullWidth
                margin="normal"
                variant="outlined"
            />
        );
    };

    const handleAccountChange = (value: string) => {
        const isExampleAccount = exampleAccounts.includes(value);
        setIsDarkListAccount(isExampleAccount);
        if (isExampleAccount) {
            setOpenDialog(true);
        } else {
            setDarkListConfirmed(false);
        }
    };

    const handleDialogClose = (proceed: boolean) => {
        setOpenDialog(false);
        setDarkListConfirmed(proceed);
    };

    // Custom input component for account number
    const AccountNumberInput = ({ ...props }) => {
        const [field, meta, helpers] = useField(props);
        
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value.replace(/\D/g, '').slice(0, 26);
            helpers.setValue(value);
            handleAccountChange(value);
        };

        return (
            <Box>
                <TextField
                    {...field}
                    {...props}
                    onChange={handleChange}
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    inputProps={{
                        maxLength: 26,
                        inputMode: 'numeric',
                    }}
                />
            </Box>
        );
    };

    const onSubmit = async (values: typeof initialValues, { resetForm }: any) => {
        try {
            await axiosPrivate.post('api/transactions/', values);
            setSnackbar({ open: true, message: 'Contract added successfully!' });
            resetForm();
        } catch (error: unknown) {
            console.error('Error adding contract:', error);
            if (error instanceof Error) {
                setSnackbar({ open: true, message: `Error adding contract: ${error.message}` });
            } else {
                setSnackbar({ open: true, message: 'An unknown error occurred. Please try again.' });
            }
        }
    };

    return(
        <Container maxWidth="sm">
            <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Bank Transfer
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    enableReinitialize
                >
                    {({ isValid, dirty }) => (
                        <Form>
                            <CustomTextField
                                label="Title"
                                name="title"
                            />
                            <CustomTextField
                                label="Receiver"
                                name="receiver"
                            />
                            <CustomTextField
                                label="Receiver's address"
                                name="receiver_address"
                            />
                            <AccountNumberInput
                                label="Bank account number"
                                name="account_number"
                            />
                            <CustomTextField
                                label="Amount"
                                name="amount"
                                type="number"
                            />
                            <Button 
                                type="submit" 
                                variant="contained" 
                                color="primary" 
                                fullWidth 
                                sx={{ mt: 2 }}
                                disabled={!isValid || !dirty || (isDarkListAccount && !darkListConfirmed)}
                            >
                                Submit
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Box>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                message={snackbar.message}
            />
            <Dialog
                open={openDialog}
                onClose={() => handleDialogClose(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Warning"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This account is on the DARK LIST! Are you sure you want to proceed?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleDialogClose(false)}>Cancel</Button>
                    <Button onClick={() => handleDialogClose(true)} autoFocus>
                        Proceed
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

export default TransferForm;
