import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { fetchUserAccounts, deleteAccount } from "../services/api.js";
import "../components/UserAccountsPage.css";

export default function UserAccountsPage({ user }) {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");


  useEffect(() => {
    if (!user) return;

    const loadAccounts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchUserAccounts(user.id);
        setAccounts(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.response?.status === 404) {
          setAccounts([]);
        } else {
          setError(err.message || "Error loading accounts");
        }
      } finally {
        setLoading(false);
      }
    };

    loadAccounts();
  }, [user]);


  const filteredAccounts = accounts.filter((acc) => (filter === "all" ? true : acc.accountType === filter));

  const totalAssets = accounts
    .filter((acc) => acc.accountType === "asset")
    .reduce((sum, acc) => sum + acc.balance, 0);

  const totalLiabilities = accounts
    .filter((acc) => acc.accountType === "liability")
    .reduce((sum, acc) => sum + acc.balance, 0);

  const netWorth = totalAssets - totalLiabilities;

  const getAccountIcon = (type) => (type === "asset" ? "💰" : type === "liability" ? "💳" : "🏦");

  const getAccountTypeLabel = (type) => (type === "asset" ? "Asset" : type === "liability" ? "Liability" : "Account");

  const formatCurrency = (amount, currency = "USD") =>
    new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);

  const handleDelete = async (accountId) => {
    if (!window.confirm("Delete this account? This action cannot be undone.")) return;
    try {
      setAccounts((prev) => prev.filter((a) => a.id !== accountId));
      await deleteAccount(accountId);
    } catch (err) {
      setError(err.message || "Error deleting account");
      const data = await fetchUserAccounts(user.id);
      setAccounts(Array.isArray(data) ? data : []);
    }
  };


  if (loading) {
    return (
      <div className="user-accounts-page">
        <div className="loading-container">
          <div className="loading-spinner" />
          <p>Loading your accounts...</p>
        </div>
      </div>
    );
  }

  /*
  if (error) {
    return (
      <div className="user-accounts-page">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Something went wrong</h3>
          <p>Error: {error}</p>
          <button className="btn-retry" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }
  */

  return (
    <div className="user-accounts-page">
      <div className="container">
        <div className="header">
          <div className="header-content">
            <h1 className="title">My Accounts</h1>
            <p className="subtitle">Manage your financial accounts and track your net worth</p>
          </div>
          <Link to="/CreateAccount" className="btn-add-account">
            <span className="btn-icon">+</span>
            Add Account
          </Link>
        </div>

        <div className="stats-grid">
          <div className="stat-card stat-card--total">
            <div className="stat-header">
              <span className="stat-icon">🏦</span>
              <span className="stat-label">Total Accounts</span>
            </div>
            <p className="stat-value">{accounts.length}</p>
          </div>

          <div className="stat-card stat-card--assets">
            <div className="stat-header">
              <span className="stat-icon">💰</span>
              <span className="stat-label">Total Assets</span>
            </div>
            <p className="stat-value">{formatCurrency(totalAssets)}</p>
          </div>

          <div className="stat-card stat-card--liabilities">
            <div className="stat-header">
              <span className="stat-icon">💳</span>
              <span className="stat-label">Total Liabilities</span>
            </div>
            <p className="stat-value">{formatCurrency(totalLiabilities)}</p>
          </div>

          <div className="stat-card stat-card--networth">
            <div className="stat-header">
              <span className="stat-icon">📊</span>
              <span className="stat-label">Net Worth</span>
            </div>
            <p className={`stat-value ${netWorth >= 0 ? "positive" : "negative"}`}>{formatCurrency(netWorth)}</p>
          </div>
        </div>


        <div className="filter-section">
          <h3>Filter Accounts</h3>
          <div className="filter-buttons">
            <button className={`filter-btn ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>🏦 All ({accounts.length})</button>
            <button className={`filter-btn ${filter === "asset" ? "active" : ""}`} onClick={() => setFilter("asset")}>💰 Assets ({accounts.filter((a) => a.accountType === "asset").length})</button>
            <button className={`filter-btn ${filter === "liability" ? "active" : ""}`} onClick={() => setFilter("liability")}>💳 Liabilities ({accounts.filter((a) => a.accountType === "liability").length})</button>
          </div>
        </div>

        {filteredAccounts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏦</div>
            <h3>No accounts found</h3>
            <p>{filter === "all" ? "Get started by adding your first account" : `No ${filter} accounts found. Try a different filter.`}</p>
            {filter === "all" && (
              <Link to="/CreateAccount" className="btn-primary">
                <span className="btn-icon">+</span>
                Create Account
              </Link>
            )}
          </div>
        ) : (
          <div className="accounts-grid">
            <AnimatePresence>
              {filteredAccounts.map((account, index) => (
                <motion.div
                  key={account.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`account-card account-card--${account.accountType}`}
                >
                  <div className="account-header">
                    <div className="account-info">
                      <div className="account-icon">{getAccountIcon(account.accountType)}</div>
                      <div className="account-details">
                        <h3 className="account-name">{account.name}</h3>
                        <span className={`account-type account-type--${account.accountType}`}>{getAccountTypeLabel(account.accountType)}</span>
                      </div>
                    </div>
                    <div className="account-currency">{account.currency}</div>
                  </div>

                  <div className="account-content">
                    <div className="account-balance">
                      <span className="balance-label">Balance</span>
                      <span className={`balance-amount ${account.accountType === "liability" ? "liability" : "asset"}`}>{account.accountType === "liability" ? "-" : ""}{formatCurrency(account.balance, account.currency)}</span>
                    </div>

                    <div className="account-actions">
                      <Link className="btn-view" to={`/Account/${account.id}`}>👁️ View</Link>
                      <button className="btn-delete" onClick={() => handleDelete(account.id)}>🗑️ Delete</button>
                    </div>
                  </div>

                  {account.accountType === "liability" && (
                    <div className="liability-progress">
                      <div className="progress-info">
                        <span className="progress-label">Debt Level</span>
                        <span className="progress-value">{(Math.abs(account.balance) / totalLiabilities * 100).toFixed(1)}%</span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${Math.min(100, (Math.abs(account.balance) / totalLiabilities * 100))}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
