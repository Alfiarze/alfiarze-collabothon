import { Button, TextField, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useState, useEffect } from 'react';

function TransferForm(){
    const [accountNumber, setAccountNumber] = useState('');
    const [accountName, setAccountName] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [transferDate, setTransferDate] = useState('');
    const [openDialog, setOpenDialog] = useState(false);

    const exampleAccounts = [
        '1234567890',
        '9876543210',
        '5678901234',
    ];

    useEffect(() => {
        const isInvalid = exampleAccounts.includes(accountNumber);
        if (isInvalid && accountNumber !== '') {
            setOpenDialog(true);
        }
    }, [accountNumber]);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Add your submit logic here
        console.log('Form submitted');
    };

    return(
        <div>
            <h1>Transfer Form</h1>
            <form onSubmit={handleSubmit}>
                <TextField 
                    type="text" 
                    label="Account Number" 
                    variant="outlined"  
                    value={accountNumber} 
                    onChange={(e) => setAccountNumber(e.target.value)}
                />
                <TextField id="outlined-basic" label="Account Name" variant="outlined" value={accountName} onChange={(e) => setAccountName(e.target.value)}/><br/>
                <TextField id="outlined-basic" label="Description" variant="outlined" value={description} onChange={(e) => setDescription(e.target.value)}/><br/>
                <TextField type="date" id="outlined-basic" label="Transfer Date" variant="outlined" value={transferDate} InputLabelProps={{ shrink: true }} onChange={(e) => setTransferDate(e.target.value)}/><br/>
                <Button variant="contained" type="submit">Submit</Button>
            </form>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
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
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleCloseDialog} autoFocus>
                        Proceed
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default TransferForm;
