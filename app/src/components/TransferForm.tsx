import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

function TransferForm(){
    const [accountNumber, setAccountNumber] = useState('');
    const [accountName, setAccountName] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [transferDate, setTransferDate] = useState('');

    
    return(
        <div>
            <h1>Transfer Form</h1>
            <form>
            <TextField type="number" id="outlined-basic" label="Account Number" variant="outlined"  value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)}/>
            <TextField id="outlined-basic" label="Account Name" variant="outlined" value={accountName} onChange={(e) => setAccountName(e.target.value)}/>
            <TextField type="number" id="outlined-basic" label="Amount" variant="outlined" value={amount} onChange={(e) => setAmount(e.target.value)}/>
            <TextField id="outlined-basic" label="Description" variant="outlined" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <TextField type="date" id="outlined-basic" label="Transfer Date" variant="outlined" value={transferDate} InputLabelProps={{ shrink: true }} onChange={(e) => setTransferDate(e.target.value)}/>
            <Button variant="contained">Submit</Button>
            </form>
        </div>
    )
}

export default TransferForm;