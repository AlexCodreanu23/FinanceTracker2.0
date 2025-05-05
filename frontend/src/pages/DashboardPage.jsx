import React, { useEffect, useState, useMemo } from "react";
import Sidebar from "../components/Sidebar";
import Card from "../components/Card";
import { fetchUserAccounts, fetchUserTransactions } from "../services/api";
import "../components/DashboardPage.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid,
  BarChart, Bar,
  LabelList
} from "recharts";
import {Link} from "react-router-dom"; 

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

  const yearlyData = useMemo(() => {
    return monthNames.map((name, monthIdx) => {
      const monthlyTxs = txs.filter(tx => {
        const d = new Date(tx.date);
        return d.getFullYear() === new Date().getFullYear()
            && d.getMonth() === monthIdx;
      });
      const income  = monthlyTxs
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
      const expense = monthlyTxs
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);
      return { month: name, income, expense };
    });
  }, [txs]);

  const COLORS = [
    "#3f8efc", "#ffbb28", "#00C49F",
    "#FF8042", "#8884D8", "#82ca9d"
  ];

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

  const monthlyExpenses = monthlyTxs.filter(tx => tx.type === "expense");
  const byCategory = monthlyExpenses.reduce((acc,tx) => {
      acc[tx.categoryName] = (acc[tx.categoryName] || 0) + tx.amount;
      return acc;
  }, {});

  const incomeBySource = useMemo(() => {
      const acc = {};
      monthlyTxs.filter(tx => tx.type === "income")
                .forEach(tx => {
                  acc[tx.categoryName] = (acc[tx.categoryName] || 0) + tx.amount;
                });
      return Object.entries(acc).map(([name, value]) =>  ({name, value}));          
  }, [monthlyTxs]);


  const pieData = Object.entries(byCategory).map(
    ([name, value]) => ({name,value})
  );


  return (
    <div className="dashboard">
      <Sidebar selectedMonth={month} onChangeMonth={setMonth} />

      <div className="dashboard__content">
        <div className="dashboard__content-header">
          <h2 className="dashboard__month-title">
            {monthNames[month]} Overview
          </h2>
          <nav className="dashboard__subnav">
            <Link to="/transactions" className="dashboard__subnav-item">
              My transactions
            </Link>
            <Link to="/budgets" className="dashboard__subnav-item">
              My Budgets
            </Link>
            <Link to="/reports" className="dashboard__subnav-item">
              My Reports
            </Link>
            <Link to="/accounts" className="dashboard__subnav-item">
              My accounts
            </Link>
          </nav>
        </div>
        
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
        <div className="dashboard__charts">
          <Card title="Spending by Category">
            <PieChart width={500} height={350}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, idx) => (
                  <Cell
                    key={`cell-${idx}`}
                    fill={COLORS[idx % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                formatter={name => name}
              />
            </PieChart>
          </Card>
          <Card title="Income & Expenses">
        <ResponsiveContainer width="100%" aspect={2}>
          <LineChart data={yearlyData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={val => `$${val.toLocaleString()}`} />
            <Legend verticalAlign="top" />
            <Line
              type="monotone"
              dataKey="expense"
              name="Expenses"
              stroke="#ff8042"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="#00C49F"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
        </Card>
        <Card title = "Income Source">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={incomeBySource}
            margin={{ top: 20, right: 10, left: 0, bottom: 60 }} 
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="name"
              interval={0}                
              height={50}               
              tick={{
                fill: 'var(--text)',
                fontSize: 12,
                angle: -30,                
                textAnchor: 'end'
              }}
            />
            <YAxis
              tickFormatter={val => `$${val}`}
              stroke="var(--text)"
              tick={{ fill: 'var(--text)' }}
            />
            <Tooltip
            cursor = {false}
              labelFormatter={label => `Source: ${label}`}   
              formatter={val => `$${val.toLocaleString()}`}
              contentStyle={{
                backgroundColor: 'var(--card-bg)',
                border: `1px solid var(--border)`
              }}
              labelStyle={{ color: 'var(--text)' }}
              itemStyle={{ color: 'var(--text)' }}
            />
            <Bar dataKey="value" fill="#3f8efc" radius={[4, 4, 0, 0]}>
              <LabelList 
                dataKey="value" 
                position="top" 
                formatter={val => `$${val}`} 
                fill="var(--text)" 
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        </Card>
        </div>
      </div>
    </div>
  );
}
