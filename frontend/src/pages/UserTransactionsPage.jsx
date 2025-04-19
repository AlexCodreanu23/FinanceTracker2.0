import React, { useEffect, useState } from "react";
import { fetchUserTransactions } from "../services/api";
import "../components/UserTransactionsPage.css";

export default function UserTransactionsPage({ user }) {
  const [txs, setTxs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);

    fetchUserTransactions(user.id)
      .then(data => setTxs(data))
      .catch(err => setError(err.message || "Error loading"))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="page">
      <div className="wrapper">
        <h1 className="title">My Transactions</h1>

        <div className="card">
          {loading && <div className="loading">Loading…</div>}
          {error && <div className="error">Error: {error}</div>}
          {!loading && !error && txs.length === 0 && (
            <div className="empty">No transactions found.</div>
          )}

          {!loading && !error && txs.length > 0 && (
            <table className="table">
              <thead className="thead">
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody className="tbody">
                {txs.map(tx => (
                  <tr key={tx.id}>
                    <td className="cell-date">
                      {new Date(tx.date).toLocaleDateString()}
                    </td>
                    <td
                      className={`cell-amount ${
                        tx.amount >= 0 ? "positive" : "negative"
                      }`}
                    >
                      ${tx.amount.toFixed(2)}
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
