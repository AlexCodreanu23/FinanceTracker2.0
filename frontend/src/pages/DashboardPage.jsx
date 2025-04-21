import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import { fetchUserAccounts, fetchUserTransactions } from "../services/api";
import "../components/DashboardPage.css";

const monthNames = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

export default function DashboardPage({ user }) {
  const [month, setMonth]       = useState(new Date().getMonth());
  const [accounts, setAccounts] = useState([]);
  const [txs, setTxs]           = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchUserAccounts(user.id)
      .then(setAccounts)
      .catch(console.error);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetchUserTransactions(user.id)
      .then(data => setTxs(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const monthlyTxs = txs.filter(tx => {
      const txMonth = new Date(tx.date).getMonth();
      const txYear = new Date(tx.date).getFullYear();
      return txMonth === month && txYear === new Date().getFullYear();
  });

  const totalAssets = accounts.filter(a => a.accountType === "asset").reduce((sum, a) => sum + a.balance, 0);
  const totalLiabilities = accounts.filter(a => a.accountType === "liability").reduce((sum, a) => sum + a.balance, 0);

  const netWorth = totalAssets - totalLiabilities;

  const income = monthlyTxs.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const expenses = monthlyTxs.filter(t => t.type === "expense").reduce((sum, t)=> sum  + t.amount, 0);

  return (
    <div className="dashboard">
      <Sidebar selectedMonth={month} onChangeMonth={setMonth} />

      <div className="dashboard__content">
        <h2 className="dashboard__month-title">
          {monthNames[month]} Overview
        </h2>
        
        {loading ? (
          <p>Loading data…</p>
        ) : (
          <div className="dashboard__cards">
            <Card title="Available Assets">
              ${totalAssets.toLocaleString()}
            </Card>
            <Card title="Total Net Worth">
              ${netWorth.toLocaleString()}
            </Card>
            <Card title="Income">
              +${income.toLocaleString()}
            </Card>
            <Card title="Expenses">
              -${expenses.toLocaleString()}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
