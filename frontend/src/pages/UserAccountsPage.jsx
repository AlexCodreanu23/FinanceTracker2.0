import React, { useEffect, useState } from "react";
import { fetchUserAccounts } from "../services/api";
import { Link } from "react-router-dom";
import {motion} from "framer-motion";
import "../components/UserAccountsPage.css";

export default function UserAccountsPage({ user }) {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetchUserAccounts(user.id)
      .then(data => setAccounts(data))
      .catch(err => setError(err.message || "Error loading"))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return <div className="loading">Loading…</div>;
  }

  if (accounts.length === 0) {
    return (
      <div className="empty">
        No accounts found.
      </div>
    );
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="user-accounts-page">
      <div className="inner">
        <h1 className="title">My Accounts</h1>
        <Link to="/CreateAccount" className="btn-add-account">
          Add a new account
        </Link>
        <table className="table">
          <thead className="thead">
            <tr>
              <th>Name</th>
              <th className="type">Type</th>
              <th className="balance">Balance</th>
              <th className="currency">Currency</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {accounts.map((acc, idx) => (
              <motion.tr
                key={acc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
              >
                <td>{acc.name}</td>
                <td className={`type ${acc.accountType}`}>
                  {acc.accountType}
                </td>
                <td className="balance">{acc.balance.toFixed(2)}</td>
                <td className="currency">{acc.currency}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
