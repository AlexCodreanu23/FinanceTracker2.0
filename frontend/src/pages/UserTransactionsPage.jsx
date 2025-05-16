import React, { useEffect, useState } from "react";
import { fetchUserTransactions } from "../services/api";
import {Link} from "react-router-dom"
import "../components/UserTransactionsPage.css";

export default function UserTransactionsPage({ user }) {
  const [txs, setTxs]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetchUserTransactions(user.id)
      .then(raw => {
      const arr = raw;
      const sorted = [...arr].sort((a, b) =>
        new Date(b.date) - new Date(a.date)
      );
      setTxs(sorted);
    })
      .catch(err => setError(err.message || "Error loading"))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="user-transactions-page">
      <div className="wrapper">
        <h1 className="title">My Transactions</h1>
        <Link to= "/CreateTransaction" className="btn-add-transaction">
            Add a transaction
        </Link>

        <div className="card">
          {loading && <div className="loading">Loading…</div>}
          {error   && <div className="error">Error: {error}</div>}
          {!loading && !error && txs.length === 0 && (
            <div className="empty">No transactions found.</div>
          )}

          {!loading && !error && txs.length > 0 && (
            <table className="table">
              <thead className="thead">
                <tr>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody className="tbody">
                {txs.map(tx => (
                  <tr key={tx.id}>
                    <td className={`type ${tx.type}`}>
                      {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                    </td>
                    <td className="category-name">
                      {tx.categoryName}
                    </td>
                    <td className="cell-date">
                      {new Date(tx.date).toLocaleDateString()}
                    </td>
                    <td className={`cell-amount ${
                        tx.type === "income" ? "positive" : "negative"
                      }`}>
                      {tx.type === "income" ? "+" : "−"}${Math.abs(tx.amount).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
