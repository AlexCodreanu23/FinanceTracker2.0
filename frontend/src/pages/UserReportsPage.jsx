import React, { useEffect, useState } from "react";
import { fetchUserReports } from "../services/api";
import "../components/UserReportsPage.css";

export default function UserReportsPage({ user }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);

    fetchUserReports(user.id)
      .then(data => setReports(data))
      .catch(err => setError(err.message || "Error loading"))
      .finally(() => setLoading(false));
  }, [user]);


  const formatMonthYear = str => {
    if (!str) return "—";
    const parts = str.split("/");
    if (parts.length !== 2) return str;
    const [m, y] = parts;
    const monthNum = parseInt(m, 10) - 1;
    if (isNaN(monthNum) || isNaN(parseInt(y, 10))) return str;
    const d = new Date(parseInt(y, 10), monthNum);
    return d.toLocaleString("default", { month: "long", year: "numeric" });
  };

  return (
    <div className="page">
      <div className="inner">
        <h1 className="title">My Reports</h1>

        {loading && <div className="loading">Loading…</div>}
        {error   && <div className="error">Error: {error}</div>}
        {!loading && !error && reports.length === 0 && (
          <div className="empty">No reports found.</div>
        )}

        {!loading && !error && reports.length > 0 && (
          <table className="table">
            <thead className="thead">
              <tr>
                <th className="amount-spent">Amount Spent</th>
                <th className="month-year">Month/Year</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {reports.map(rp => (
                <tr key={rp.id}>
                  <td className="amount-spent">
                    ${rp.amountSpent?.toFixed(2)}
                  </td>
                  <td className="month-year">
                    {formatMonthYear(rp.month_year || rp.monthYear)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
