import React, { useEffect, useState } from "react";
import { fetchUserBudgets } from "../services/api";
import { Link } from "react-router-dom";
import "../components/UserBudgetsPage.css";

export default function UserBudgetsPage({ user }) {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);

    fetchUserBudgets(user.id)
     .then(data => {
      const sorted = [...data].sort((a, b) =>
        new Date(b.start_date) - new Date(a.start_date)
      );
      setBudgets(sorted);
      })
      .catch(err => setError(err.message || "Error loading"))
      .finally(() => setLoading(false));
  }, [user]);

  const formatDate = str => {
    if (!str) return "—";
    const d = new Date(str);
    return isNaN(d) ? "Invalid Date" : d.toLocaleDateString();
  };

  return (
    <div className="user-budgets-page">
      <div className="inner">
        <h1 className="title">My Budgets</h1>
        <Link to="/CreateBudget" className = "btn-add-budget">
          Add a budget
        </Link>

        {loading && <div className="loading">Loading…</div>}
        {error   && <div className="error">Error: {error}</div>}
        {!loading && !error && budgets.length === 0 && (
          <div className="empty">No budgets found.</div>
        )}

        {!loading && !error && budgets.length > 0 && (
          <table className="table">
            <thead className="thead">
              <tr>
                <th>Name</th>
                <th className="amount">Amount</th>
                <th className="start-date">Start Date</th>
                <th className="end-date">End Date</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {budgets.map(bd => {
                const name      = bd.budgetName;
                const amt       = bd.amount;
                const startRaw  = bd.start_date;
                const endRaw    = bd.end_date;

                return (
                  <tr key={bd.id}>
                    <td>{name}</td>
                    <td className="amount">${amt?.toFixed(2)}</td>
                    <td className="start-date">{formatDate(startRaw)}</td>
                    <td className="end-date">{formatDate(endRaw)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
