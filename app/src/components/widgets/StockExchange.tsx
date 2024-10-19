import React, { useState, useEffect } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  historicalData: { date: string; price: number }[];
}

const StockExchange: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [selectedStock, setSelectedStock] = useState<string>('AAPL');

  useEffect(() => {
    // Simulated stock data - replace this with actual API call
    const mockStocks: Stock[] = [
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 182.50,
        change: 1.2,
        historicalData: [
          { date: '2024-04', price: 175.80 },
          { date: '2024-05', price: 178.30 },
          { date: '2024-06', price: 176.90 },
          { date: '2024-07', price: 179.40 },
          { date: '2024-08', price: 181.20 },
          { date: '2024-09', price: 180.50 },
          { date: '2024-10', price: 182.50 },
        ],
      },
      {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        price: 3120.75,
        change: -0.8,
        historicalData: [
          { date: '2024-04', price: 3080.50 },
          { date: '2024-05', price: 3110.30 },
          { date: '2024-06', price: 3095.80 },
          { date: '2024-07', price: 3130.40 },
          { date: '2024-08', price: 3150.60 },
          { date: '2024-09', price: 3145.90 },
          { date: '2024-10', price: 3120.75 },
        ],
      },
      {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        price: 365.80,
        change: 0.5,
        historicalData: [
          { date: '2024-04', price: 355.60 },
          { date: '2024-05', price: 358.90 },
          { date: '2024-06', price: 357.20 },
          { date: '2024-07', price: 360.50 },
          { date: '2024-08', price: 363.80 },
          { date: '2024-09', price: 364.10 },
          { date: '2024-10', price: 365.80 },
        ],
      },
      {
        symbol: 'AMZN',
        name: 'Amazon.com Inc.',
        price: 3750.20,
        change: 1.5,
        historicalData: [
          { date: '2024-04', price: 3650.30 },
          { date: '2024-05', price: 3680.70 },
          { date: '2024-06', price: 3670.90 },
          { date: '2024-07', price: 3700.40 },
          { date: '2024-08', price: 3730.60 },
          { date: '2024-09', price: 3720.80 },
          { date: '2024-10', price: 3750.20 },
        ],
      },
      {
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        price: 890.30,
        change: -1.2,
        historicalData: [
          { date: '2024-04', price: 865.40 },
          { date: '2024-05', price: 880.20 },
          { date: '2024-06', price: 875.90 },
          { date: '2024-07', price: 885.70 },
          { date: '2024-08', price: 895.50 },
          { date: '2024-09', price: 901.80 },
          { date: '2024-10', price: 890.30 },
        ],
      },
    ];

    setStocks(mockStocks);
  }, []);

  const handleStockChange = (event: SelectChangeEvent) => {
    setSelectedStock(event.target.value as string);
  };

  const currentStock = stocks.find(stock => stock.symbol === selectedStock) || stocks[0];

  const getYAxisDomain = (data: { price: number }[]) => {
    const prices = data.map(item => item.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const padding = (maxPrice - minPrice) * 0.1;
    return [minPrice - padding, maxPrice + padding];
  };

  const formatYAxis = (value: number) => {
    return value.toFixed(2);
  };

  const formatTooltip = (value: number) => {
    return `$${value.toFixed(2)}`;
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      bgcolor: 'background.default'
    }}>
      <Box sx={{ 
        width: '100%', 
        maxWidth: 600, 
        bgcolor: 'background.paper', 
        p: 4, 
        borderRadius: 2, 
        boxShadow: 3,
        textAlign: 'center' 
      }}>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="stock-select-label">Select a Stock</InputLabel>
          <Select
            labelId="stock-select-label"
            id="stock-select"
            value={selectedStock}
            label="Select a Stock"
            onChange={handleStockChange}
          >
            {stocks.map((stock) => (
              <MenuItem key={stock.symbol} value={stock.symbol}>
                {stock.name} ({stock.symbol})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {currentStock && (
          <Box>
            <Box sx={{ height: 300, mb: 3 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={currentStock.historicalData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis 
                    domain={getYAxisDomain(currentStock.historicalData)} 
                    tickFormatter={formatYAxis}
                  />
                  <Tooltip formatter={formatTooltip} />
                  <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Current Price: ${currentStock.price.toFixed(2)}
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: currentStock.change >= 0 ? 'success.main' : 'error.main' 
              }}
            >
              Change: {currentStock.change.toFixed(2)}%
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default StockExchange;
