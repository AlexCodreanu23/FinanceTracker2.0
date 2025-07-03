
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  deleteBudget,
  fetchCategories,       
  fetchUserTransactions, 
  fetchUserBudgets,      
} from "../services/api"
import { Link } from "react-router-dom"
import "../components/UserBudgetsPage.css"

export default function UserBudgetsPage({ user }) {
  const [budgets, setBudgets] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [confirmId, setConfirmId] = useState(null)
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await fetchCategories()
        const hasAll = cats.some((c) => c.name === "All")
        setCategories(
          hasAll ? cats : [{ id: 0, name: "All" }, ...cats]
        )
      } catch (err) {
        console.error("Error fetching categories:", err)
      }
    }
    loadCategories()
  }, [])

  useEffect(() => {
    if (!user) return
    const loadTxs = async () => {
      try {
        const txs = await fetchUserTransactions(user.id)
        setTransactions(txs)
      } catch (err) {
        console.error("Error fetching transactions:", err)
      }
    }
    loadTxs()
  }, [user])

  useEffect(() => {
  if (!user) return
    const loadBudgets = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchUserBudgets(user.id)
        const arr = Array.isArray(data) ? data : []
        const sorted = [...arr].sort(
          (a, b) => new Date(b.start_date) - new Date(a.start_date)
        )
        setBudgets(sorted)
      } catch (err) {
        if (err.response?.status === 404) {
          setBudgets([])
        } else {
          setError(err.message || "Error loading budgets.")
        }
      } finally {
        setLoading(false)
      }
    }
    loadBudgets()
  }, [user])

  const handleDelete = async (id) => {
    try {
      await deleteBudget(id)
      setBudgets((prev) => prev.filter((b) => b.id !== id))
      setConfirmId(null)
    } catch (err) {
      console.error("Error deleting budget:", err)
      setError("Could not delete budget. Please try again.")
    }
  }

  const formatDate = (str) => {
    if (!str) return "—"
    const d = new Date(str)
    return isNaN(d)
      ? "Invalid Date"
      : d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
  }

  const getCategoryName = (id) => {
    const cat = categories.find((c) => c.id === id)
    return cat ? cat.name : "—"
  }

  const allCategoryId = categories.find((c) => c.name === "All")?.id
  const budgetsWithStats = budgets.map((bd) => {
    const spent = transactions
      .filter((tx) => {
        const txDate = new Date(tx.date)
        const start = new Date(bd.start_date)
        const end = new Date(bd.end_date)
        const inPeriod = txDate >= start && txDate <= end
        if (bd.categoryId === allCategoryId) {
          return inPeriod
        }
        return inPeriod && tx.categoryId === bd.categoryId
      })
      .reduce((sum, tx) => sum + tx.amount, 0)

    const remaining = bd.amount - spent
    const percentSpent = (spent / bd.amount) * 100
    return { ...bd, spent, remaining, percentSpent }
  })

  const getBudgetStatus = (budget) => {
    if (budget.remaining < 0) return "over"
    if (budget.percentSpent > 80) return "warning"
    if (budget.percentSpent > 60) return "caution"
    return "good"
  }

  const getStatusText = (status) => {
    switch (status) {
      case "over":
        return "Over Budget"
      case "warning":
        return "High Usage"
      case "caution":
        return "Moderate"
      default:
        return "On Track"
    }
  }

  const totalBudgets = budgetsWithStats.length
  const totalAllocated = budgetsWithStats.reduce((s, b) => s + b.amount, 0)
  const totalSpent = budgetsWithStats.reduce((s, b) => s + (b.spent || 0), 0)
  const totalRemaining = budgetsWithStats.reduce(
    (s, b) => s + (b.remaining || 0),
    0
  )

  if (loading) {
    return (
      <div className="user-budgets-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your budgets...</p>
        </div>
      </div>
    )
  }

  /*
  if (error) {
    return (
      <div className="user-budgets-page">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <p>Error: {error}</p>
        </div>
      </div>
    )
  }
  */
  return (
    <div className="user-budgets-page">
      <div className="container">
        <div className="header">
          <div className="header-content">
            <h1 className="title">My Budgets</h1>
            <p className="subtitle">Track and manage your spending limits</p>
          </div>
          <Link to="/CreateBudget" className="btn-add-budget">
            <span className="btn-icon">+</span>
            Add Budget
          </Link>
        </div>

        <div className="stats-grid">
          <StatCard icon="🎯" label="Total Budgets" value={totalBudgets} />
          <StatCard
            icon="💰"
            label="Total Allocated"
            value={`$${totalAllocated.toFixed(2)}`}
          />
          <StatCard
            icon="📉"
            label="Total Spent"
            value={`$${totalSpent.toFixed(2)}`}
          />
          <StatCard
            icon="📈"
            label="Remaining"
            value={`$${totalRemaining.toFixed(2)}`}
          />
        </div>

        {budgetsWithStats.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="budgets-grid">
            {budgetsWithStats.map((budget, index) => {
              const status = getBudgetStatus(budget)
              return (
                <motion.div
                  key={budget.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`budget-card ${status}`}
                >
                  <BudgetHeader
                    budget={budget}
                    status={status}
                    statusText={getStatusText(status)}
                    getCategoryName={getCategoryName}
                  />

                  <div className="budget-content">
                    <BudgetAmounts budget={budget} />

                    <BudgetDates
                      start={formatDate(budget.start_date)}
                      end={formatDate(budget.end_date)}
                    />

                    <BudgetActions
                      confirmId={confirmId}
                      budgetId={budget.id}
                      onConfirm={() => handleDelete(budget.id)}
                      onAskConfirm={() => setConfirmId(budget.id)}
                      onCancel={() => setConfirmId(null)}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ icon, label, value }) {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <span className="stat-icon">{icon}</span>
        <span className="stat-label">{label}</span>
      </div>
      <p className="stat-value">{value}</p>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-icon">🎯</div>
      <h3>No budgets found</h3>
      <p>Get started by creating your first budget</p>
      <Link to="/CreateBudget" className="btn-primary">
        <span className="btn-icon">+</span>
        Create Budget
      </Link>
    </div>
  )
}

function BudgetHeader({ budget, status, statusText, getCategoryName }) {
  return (
    <div className="budget-header">
      <div className="budget-info">
        <h3 className="budget-name">{budget.budgetName}</h3>
        <p className="budget-category">{getCategoryName(budget.categoryId)}</p>
      </div>
      <div className={`budget-status status-${status}`}>{statusText}</div>
    </div>
  )
}

function BudgetAmounts({ budget }) {
  return (
    <div className="budget-amounts">
      <div className="amount-row">
        <span className="amount-label">
          ${budget.spent?.toFixed(2)} spent
        </span>
        <span className="amount-total">
          ${budget.amount.toFixed(2)} budget
        </span>
      </div>

      <div className="progress-container">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${Math.min(100, budget.percentSpent)}%` }}
          ></div>
        </div>
        <div className="progress-info">
          <span className="progress-percent">
            {budget.percentSpent.toFixed(1)}% used
          </span>
          <span
            className={`remaining-amount ${
              budget.remaining < 0 ? "negative" : "positive"
            }`}
          >
            ${Math.abs(budget.remaining).toFixed(2)}{" "}
            {budget.remaining < 0 ? "over" : "left"}
          </span>
        </div>
      </div>
    </div>
  )
}

function BudgetDates({ start, end }) {
  return (
    <div className="budget-dates">
      <span className="date-icon">📅</span>
      <span>
        {start} - {end}
      </span>
    </div>
  )
}

function BudgetActions({
  confirmId,
  budgetId,
  onConfirm,
  onAskConfirm,
  onCancel,
}) {
  return (
    <div className="budget-actions">
      {confirmId === budgetId ? (
        <div className="confirm-delete">
          <span>Delete this budget?</span>
          <div className="confirm-buttons">
            <button onClick={onConfirm} className="btn-confirm">
              Yes
            </button>
            <button onClick={onCancel} className="btn-cancel">
              No
            </button>
          </div>
        </div>
      ) : (
        <button onClick={onAskConfirm} className="btn-delete">
          🗑️ Delete Budget
        </button>
      )}
    </div>
  )
}
