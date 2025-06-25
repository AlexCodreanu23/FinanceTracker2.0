import React, { useEffect, useState } from "react";
import { fetchUserTransactions } from "../services/api";
import {Link} from "react-router-dom"
import {motion} from "framer-motion"
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

  if (loading) {
    return <div className="loading">Loading…</div>;
  }

  if (txs.length === 0) {
    return (
      <div className="empty">
        No transactions found.
      </div>
    );
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }


  return (
    <div className="user-transactions-page">
      <div className="wrapper">
        <h1 className="title">My Transactions</h1>
        <Link to= "/CreateTransaction" className="btn-add-transaction">
            Add a transaction
        </Link>

        <div className="card">
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
            {txs.map((tx, index) => (
              <motion.tr
                key={tx.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
              >
                <td className={`type ${tx.type}`}>
                  {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                </td>
                <td className="category-name">{tx.categoryName}</td>
                <td className="cell-date">
                  {new Date(tx.date).toLocaleDateString()}
                </td>
                <td
                  className={`cell-amount ${
                    tx.type === "income" ? "positive" : "negative"
                  }`}
                >
                  {tx.type === "income" ? "+" : "−"}$
                  {Math.abs(tx.amount).toFixed(2)}
                </td>
              </motion.tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
