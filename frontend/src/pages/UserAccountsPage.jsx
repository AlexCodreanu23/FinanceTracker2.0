import React, { useEffect, useState } from "react";
import { fetchUserAccounts } from "../services/api";
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

  return (
    <div className="page">
      <div className="inner">
        <h1 className="title">My Accounts</h1>

        {loading && <div className="tbody"><em>Loading…</em></div>}
        {error && <div className="tbody"><span style={{ color: "red" }}>Error: {error}</span></div>}
        {!loading && !error && accounts.length === 0 && (
          <div className="tbody">No accounts found.</div>
        )}

        {!loading && !error && accounts.length > 0 && (
          <table className="table">
            <thead className="thead">
              <tr>
                <th>Name</th>
                <th className="balance">Balance</th>
                <th className="currency">Currency</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {accounts.map(acc => (
                <tr key={acc.id}>
                  <td>{acc.name}</td>
                  <td className="balance">{acc.balance.toFixed(2)}</td>
                  <td className="currency">{acc.currency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
