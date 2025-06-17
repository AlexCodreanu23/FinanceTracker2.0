import React, { useEffect, useState, useMemo, useRef } from "react";
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
import {Link, useNavigate} from "react-router-dom"; 
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const monthNames = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

export default function DashboardPage({ user, setUser }) {
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };


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

  const [topCategory, maxCategoryValue] = useMemo(() => {
    const entries = Object.entries(byCategory);
    if (entries.length===0) return ["N/A",0];
    const sorted = entries.sort((a,b)=>b[1]-a[1]);
    return [sorted[0][0], sorted[0][1]];
  }, [byCategory]);

  const avg3 = useMemo(() => {
    const idx = month;
    const slice = yearlyData.slice(Math.max(0, idx-2), idx+1);
    if (slice.length===0) return 0;
    const total = slice.reduce((s,m)=>s+m.expense,0);
    return total/slice.length;
  }, [yearlyData, month]);


  const dashboardRef = useRef();
  const pieRef = useRef();
  const lineRef = useRef();
  const barRef = useRef();
  const exportPDF = async () => {
  const pdf = new jsPDF({ unit: 'pt', format: 'a4', orientation: 'landscape' });
  pdf.setFontSize(18);
  pdf.text(`Overview — ${monthNames[month]} ${new Date().getFullYear()}`, 40, 40);
  pdf.setFontSize(12);
  pdf.text(`Total Assets: $${accounts
    .filter(a=>a.accountType==='asset')
    .reduce((s,a)=>s+a.balance,0)
    .toLocaleString()}`, 40, 70);
  pdf.text(`Net Worth:    $${(accounts
    .filter(a=>a.accountType==='asset').reduce((s,a)=>s+a.balance,0)
    - accounts.filter(a=>a.accountType==='liability').reduce((s,a)=>s+a.balance,0)
  ).toLocaleString()}`, 40, 90);
  pdf.text(`Income:       +$${income.toLocaleString()}`, 40, 110);
  pdf.text(`Expenses:     -$${expenses.toLocaleString()}`, 40, 130);

  const pieImg  = await html2canvas(pieRef.current,  { scale: 2 }).then(c => c.toDataURL());
  const lineImg = await html2canvas(lineRef.current, { scale: 2 }).then(c => c.toDataURL());
  const barImg  = await html2canvas(barRef.current,  { scale: 2 }).then(c => c.toDataURL());


  pdf.addImage(pieImg,  "PNG", 60, 210, 300, 210);
  pdf.addPage();
  pdf.addImage(lineImg, "PNG", 60,  90, 650, 300);
  pdf.addPage();
  pdf.addImage(barImg,  "PNG", 40,  60, 500, 200);
  const delta = expenses - avg3;
  pdf.text(
    delta>0
      ? `Expenses are $${delta.toLocaleString()} (${((delta/avg3)*100).toFixed(1)}%) above your 3‑month average of $${avg3.toLocaleString()}.`
      : `Expenses are $${(-delta).toLocaleString()} (${((1-delta/avg3)*100).toFixed(1)}%) below your 3‑month average of $${avg3.toLocaleString()}.`,
    40,
    280,
    { maxWidth: 500 }
    
  );
  pdf.text(`The category you spent the most on this month is ${topCategory}.`, 40, 310, { maxWidth: 500 });
  pdf.text(`The total amount spent on ${topCategory} is $${maxCategoryValue.toLocaleString()}.`, 40, 330, { maxWidth: 500 });

  pdf.save(`dashboard-${monthNames[month]}-${new Date().getFullYear()}.pdf`);
};


  return (
    <div className="dashboard">
      <Sidebar selectedMonth={month} onChangeMonth={setMonth} />

      <div className="dashboard__content" ref = {dashboardRef}>
        <div className="dashboard__content-header">
          <h2 className="dashboard__month-title">
            {monthNames[month]} Overview
          </h2>
          <button className="dashboard__export-button" onClick={exportPDF}>Export this month as PDF</button>
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
          <button onClick={handleSignOut} className="dashboard__signout-button">
            Sign out
          </button>
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
          <div className="chart-wrapper" ref={pieRef}>
            <Card title="Spending by Category">
              <ResponsiveContainer width="100%" height="100%">
              <PieChart>
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
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
                </Pie>
              <Tooltip/>
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                formatter={name => name}
              />
            </PieChart>
            </ResponsiveContainer>
          </Card>
          </div>
          <div className = "chart-wrapper" ref={lineRef}>
          <Card title="Income & Expenses">
        <ResponsiveContainer width="100%" height = "100%">
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
        </div>
        <div className = "chart-wrapper" ref={barRef}>
        <Card title = "Income Source">
        <ResponsiveContainer width="100%" height="100%">
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
    </div>
  );
}
