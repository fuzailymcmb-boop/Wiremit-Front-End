import React, { useState, useContext } from 'react';
import { FXContext } from './FXContext';

const SendMoneySection = () => {
  const { rates } = useContext(FXContext);
  const [amountUSD, setAmountUSD] = useState('');
  const [currency, setCurrency] = useState('GBP');
  const [result, setResult] = useState(null);
  const minAmount = 10;
  const maxAmount = 1000;

  const fees = { GBP: 0.10, ZAR: 0.20 };

  const roundUp = num => Math.ceil(num * 100) / 100; // round up to 2 decimals

  const handleCalculate = () => {
    const amount = parseFloat(amountUSD);
    if (isNaN(amount) || amount < minAmount || amount > maxAmount) {
      setResult({ error: `Amount must be between ${minAmount} and ${maxAmount} USD` });
      return;
    }
    const feePercent = fees[currency];
    const feeAmount = roundUp(amount * feePercent);
    const amountAfterFee = amount - feeAmount;
    const fxRate = rates[currency];
    if (!fxRate) {
      setResult({ error: 'FX rate not available' });
      return;
    }
    const finalAmount = roundUp(amountAfterFee * fxRate);
    setResult({
      feeAmount,
      finalAmount,
      currency,
    });
  };

  return (
    <div>
      <h3>Send Money</h3>
      <input
        type="number"
        placeholder="Amount in USD"
        value={amountUSD}
        onChange={e => setAmountUSD(e.target.value)}
        min={minAmount}
        max={maxAmount}
      />
      <select value={currency} onChange={e => setCurrency(e.target.value)}>
        <option value="GBP">GBP (UK)</option>
        <option value="ZAR">ZAR (South Africa)</option>
      </select>
      <button onClick={handleCalculate}>Calculate</button>
      {result && result.error && <p style={{color:'red'}}>{result.error}</p>}
      {result && !result.error && (
        <div>
          <p>Transaction Fee: {result.feeAmount.toFixed(2)} USD</p>
          <p>Recipient receives: {result.finalAmount.toFixed(2)} {result.currency}</p>
        </div>
      )}
    </div>
  );
};

export default SendMoneySection;
