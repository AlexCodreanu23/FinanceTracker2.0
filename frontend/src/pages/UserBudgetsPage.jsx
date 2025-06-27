import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchUserBudgets, fetchCategories, deleteBudget, fetchUserTransactions } from "../services/api";
import { Link } from "react-router-dom";
import "../components/UserBudgetsPage.css";

export default function UserBudgetsPage({ user }) {
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [transactions, setTransactions] = useState([]);

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
    const loadTxs = async () => {
      try {
        const txs = await fetchUserTransactions(user.id);
        setTransactions(txs);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };
    loadTxs();
  }, [user]);

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

  const handleDelete = async (id) => {
    try {
      await deleteBudget(id);
      setBudgets(prev => prev.filter(b => b.id !== id));
      setConfirmId(null);
    } catch (err) {
      console.error("Error deleting budget:", err);
      setError("Could not delete budget. Please try again.");
    }
  };

  const formatDate = (str) => {
    if (!str) return "—";
    const d = new Date(str);
    return isNaN(d) ? "Invalid Date" : d.toLocaleDateString();
  };

  const getCategoryName = (id) => {
    const cat = categories.find((c) => c.id === id);
    return cat ? cat.name : "—";
  };

  const allCategoryId = categories.find(c => c.name === 'All')?.id;

  const budgetsWithStats = budgets.map((bd) => {
    const spent = transactions
      .filter(tx => {
        const txDate   = new Date(tx.date);
        const start    = new Date(bd.start_date);
        const end      = new Date(bd.end_date);
        const inPeriod = txDate >= start && txDate <= end;
        if (bd.categoryId === allCategoryId) {
          return inPeriod;
        }
        return inPeriod && tx.categoryId === bd.categoryId;
      })
      .reduce((sum, tx) => sum + tx.amount, 0);

    const remaining = bd.amount - spent;
    return { ...bd, spent, remaining };
  });

  if (loading) return <div className="loading">Loading…</div>;
  if (budgetsWithStats.length === 0) return <div className="empty">No budgets found.</div>;
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
              <th className="remaining">Remaining</th>
              <th className="start-date">Start Date</th>
              <th className="end-date">End Date</th>
              <th className="actions">Actions</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {budgetsWithStats.map((bd, index) => (
              <motion.tr
                key={bd.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className= {bd.remaining < 0 ? "row-danger" : bd.spent / bd.amount > 0.8 ? "row-warning" : ""}
              >
                <td>{bd.budgetName}</td>
                <td>{getCategoryName(bd.categoryId)}</td>
                <td className="amount">${bd.amount?.toFixed(2)}
                  <div className="progress-bar">
                    <div
                      className="fill"
                      style={{
                        width: `${Math.min(
                          100,
                          (bd.spent / bd.amount) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </td>
                <td className={`remaining ${bd.remaining < 0 ? "negative" : ""}`}>
                  ${bd.remaining.toFixed(2)}
                </td>
                <td className="start-date">{formatDate(bd.start_date)}</td>
                <td className="end-date">{formatDate(bd.end_date)}</td>
                <td className="actions">
                  {confirmId === bd.id ? (
                    <div className="confirm-inline">
                      <span>Are you sure? </span>
                      <button
                        onClick={() => handleDelete(bd.id)}
                        className="btn-confirm"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setConfirmId(null)}
                        className="btn-cancel"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmId(bd.id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
