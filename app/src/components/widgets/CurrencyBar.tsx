import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';

interface ExchangeRate {
  currency: string;
  rate: number;
}

interface ExchangeRateResponse {
  rates: Record<string, number>;
}

const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const CurrencyBarContainer = styled.div`
  width: 100%;
  overflow: hidden;
  background-color: #f3f4f6;
  padding: 10px 0;
`;

const CurrencyBarScroller = styled.div`
  display: flex;
  animation: ${scroll} 30s linear infinite;
  white-space: nowrap;

  &:hover {
    animation-play-state: paused;
  }
`;

const CurrencyItem = styled.div`
  display: inline-flex;
  align-items: center;
  margin-right: 20px;
  font-size: 14px;
`;

const CurrencyCode = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

const CurrencyRate = styled.span`
  color: #4a5568;
`;

const CurrencyBar: React.FC = () => {
  const [rates, setRates] = useState<ExchangeRate[]>([]);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get<ExchangeRateResponse>('https://api.exchangerate-api.com/v4/latest/USD');
        const data = response.data.rates;
        
        const selectedCurrencies = ['EUR', 'PLN', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'SEK', 'NZD', 'MXN'];
        const formattedRates = selectedCurrencies.map(currency => ({
          currency,
          rate: data[currency]
        }));
        
        setRates(formattedRates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <CurrencyBarContainer>
      <CurrencyBarScroller>
        {rates.concat(rates).map(({ currency, rate }, index) => (
          <CurrencyItem key={`${currency}-${index}`}>
            <CurrencyCode>{currency}</CurrencyCode>
            <CurrencyRate>{rate.toFixed(2)}</CurrencyRate>
          </CurrencyItem>
        ))}
      </CurrencyBarScroller>
    </CurrencyBarContainer>
  );
};

export default CurrencyBar;
