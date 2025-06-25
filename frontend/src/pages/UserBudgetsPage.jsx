import React, { useEffect, useState } from "react";
import { fetchUserBudgets, fetchCategories } from "../services/api";
import { Link } from "react-router-dom";
import "../components/UserBudgetsPage.css";

export default function UserBudgetsPage({ user }) {
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await fetchCategories();
        setCategories(cats);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    if (!user) return;
    const loadBudgets = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchUserBudgets(user.id);
        const sorted = Array.isArray(data)
          ? [...data].sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
          : [];
        setBudgets(sorted);
      } catch (err) {
        setError(err.message || "Error loading budgets.");
      } finally {
        setLoading(false);
      }
    };
    loadBudgets();
  }, [user]);

  const formatDate = (str) => {
    if (!str) return "—";
    const d = new Date(str);
    return isNaN(d) ? "Invalid Date" : d.toLocaleDateString();
  };

  const getCategoryName = (id) => {
    const cat = categories.find((c) => c.id === id);
    return cat ? cat.name : "—";
  };

  if (loading) return <div className="loading">Loading…</div>;
  if (budgets.length === 0) return <div className="empty">No budgets found.</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="user-budgets-page">
      <div className="inner">
        <h1 className="title">My Budgets</h1>
        <Link to="/CreateBudget" className="btn-add-budget">
          Add a budget
        </Link>

        <table className="table">
          <thead className="thead">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th className="amount">Amount</th>
              <th className="start-date">Start Date</th>
              <th className="end-date">End Date</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {budgets.map((bd) => (
              <tr key={bd.id}>
                <td>{bd.budgetName}</td>
                <td>{getCategoryName(bd.categoryId)}</td>
                <td className="amount">${bd.amount?.toFixed(2)}</td>
                <td className="start-date">{formatDate(bd.start_date)}</td>
                <td className="end-date">{formatDate(bd.end_date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
