import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const currencies = ['EUR', 'PLN', 'USD'];

function ExchangeWidget() {
  const [firstCurrency, setFirstCurrency] = useState('');
  const [secondCurrency, setSecondCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState('');

  const handleFirstCurrencyChange = (event: SelectChangeEvent) => {
    setFirstCurrency(event.target.value);
  };

  const handleSecondCurrencyChange = (event: SelectChangeEvent) => {
    setSecondCurrency(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically call an API to get the exchange rate and calculate the result
    // For now, we'll just set a placeholder result
    setResult(`${amount} ${firstCurrency} = X ${secondCurrency}`);
  };

  return (
    <div>
      <h1>Currency Exchange</h1>
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="first-currency-label">From Currency</InputLabel>
          <Select
            labelId="first-currency-label"
            id="first-currency"
            value={firstCurrency}
            onChange={handleFirstCurrencyChange}
            input={<OutlinedInput label="From Currency" />}
          >
            {currencies.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="second-currency-label">To Currency</InputLabel>
          <Select
            labelId="second-currency-label"
            id="second-currency"
            value={secondCurrency}
            onChange={handleSecondCurrencyChange}
            input={<OutlinedInput label="To Currency" />}
          >
            {currencies.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          sx={{ m: 1, width: 300 }}
          label="Amount"
          type="number"
          value={amount}
          onChange={handleAmountChange}
        />

        <Button sx={{ m: 1 }} type="submit" variant="contained">
          Convert
        </Button>
      </form>

      {result && <p>{result}</p>}
    </div>
  );
}

export default ExchangeWidget;
