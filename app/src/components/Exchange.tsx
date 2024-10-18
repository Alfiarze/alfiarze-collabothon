import React, { useState } from 'react';
import { FlagIcon } from 'react-flag-kit'; // You may need to install this package

function Exchange() {
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [amount, setAmount] = useState('');

    const handleExchange = () => {
        // Implement exchange logic here
        console.log(`Exchange ${amount} ${fromCurrency} to ${toCurrency}`);
    };

    return (
        <div className="exchange-container">
            <h1>Currency Exchange</h1>
            <div className="exchange-form">
                <div className="currency-input">
                    <FlagIcon code={fromCurrency.slice(0, 2)} size={48} />
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                    />
                    <select
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                    >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        {/* Add more currency options as needed */}
                    </select>
                </div>
                <div className="exchange-arrow">→</div>
                <div className="currency-input">
                    <FlagIcon code={toCurrency.slice(0, 2)} size={48} />
                    <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                    >
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                        <option value="GBP">GBP</option>
                        {/* Add more currency options as needed */}
                    </select>
                </div>
            </div>
            <button onClick={handleExchange}>Exchange</button>
        </div>
    );
}

export default Exchange;
