import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

const PAGE_SIZE = 5;

const TransactionHistory = () => {
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (user) {
      // Load transactions from localStorage or mock data
      const allTx = JSON.parse(localStorage.getItem(`tx_${user.email}`)) || [];
      setTransactions(allTx);
    }
  }, [user]);

  const totalPages = Math.ceil(transactions.length / PAGE_SIZE);
  const currentTx = transactions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <h3>Transaction History</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th><th>Amount (USD)</th><th>Currency</th><th>Final Amount</th>
          </tr>
        </thead>
        <tbody>
          {currentTx.map((tx, i) => (
            <tr key={i}>
              <td>{new Date(tx.date).toLocaleDateString()}</td>
              <td>{tx.amountUSD.toFixed(2)}</td>
              <td>{tx.currency}</td>
              <td>{tx.finalAmount.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span> Page {page} of {totalPages} </span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default TransactionHistory;
