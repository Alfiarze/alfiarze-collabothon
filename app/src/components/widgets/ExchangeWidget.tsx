import React, { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const currencies = ['EUR', 'PLN', 'USD', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'SEK', 'NZD', 'MXN', 'SGD', 'HKD', 'NOK'];

// Static exchange rates (base currency: EUR)
const exchangeRates: { [key: string]: number } = {
  EUR: 1,
  PLN: 4.45,
  USD: 1.18,
  GBP: 0.86,
  JPY: 130.24,
  CAD: 1.48,
  AUD: 1.59,
  CHF: 1.08,
  CNY: 7.63,
  SEK: 10.15,
  NZD: 1.68,
  MXN: 23.66,
  SGD: 1.59,
  HKD: 9.19,
  NOK: 10.08
};

function ExchangeWidget() {
  const [firstCurrency, setFirstCurrency] = useState('');
  const [secondCurrency, setSecondCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState('');

  const calculateExchangeRate = (from: string, to: string): number => {
    return exchangeRates[to] / exchangeRates[from];
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (firstCurrency && secondCurrency && amount) {
      const rate = calculateExchangeRate(firstCurrency, secondCurrency);
      const convertedAmount = parseFloat(amount) * rate;
      setResult(`${amount} ${firstCurrency} = ${convertedAmount.toFixed(2)} ${secondCurrency}`);
    }
  };

  return (
    <div>
      <h1>Currency Exchange</h1>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="first-currency-label">From Currency</InputLabel>
              <Select
                labelId="first-currency-label"
                id="first-currency"
                value={firstCurrency}
                onChange={(event: SelectChangeEvent) => setFirstCurrency(event.target.value)}
                input={<OutlinedInput label="From Currency" />}
              >
                {currencies.map((currency) => (
                  <MenuItem key={currency} value={currency}>
                    {currency}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="second-currency-label">To Currency</InputLabel>
              <Select
                labelId="second-currency-label"
                id="second-currency"
                value={secondCurrency}
                onChange={(event: SelectChangeEvent) => setSecondCurrency(event.target.value)}
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
              fullWidth
              sx={{ mb: 2 }}
              label="Amount"
              type="number"
              value={amount}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setAmount(event.target.value)}
            />
          </Grid>
        </Grid>

        <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
          Convert
        </Button>
      </form>

      {result && (
        <Typography 
          variant="h6" 
          sx={{ 
            mt: 2, 
            textAlign: 'center', 
            fontWeight: 'bold',
            fontSize: '2rem'
          }}
        >
          {result}
        </Typography>
      )}
    </div>
  );
}

export default ExchangeWidget;
