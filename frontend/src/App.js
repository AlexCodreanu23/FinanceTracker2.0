import React, { useState, useEffect } from "react";
import UsersPage from "./pages/UsersPage";
import CategoriesPage from "./pages/CategoriesPage";
import CreateTransactionPage from "./pages/CreateTransactionPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import CreateBudgetPage from "./pages/CreateBudgetPage";
import Header from "./components/Header";
import DashboardPage from "./pages/DashboardPage";
import UserTransactionsPage from "./pages/UserTransactionsPage";
import UserAccountsPage from "./pages/UserAccountsPage";
import UserBudgetsPage from "./pages/UserBudgetsPage";
import UserReportsPage from "./pages/UserReportsPage"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import './App.css';

function App() {

  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  if (!user) {
    return (
      <LandingPage
        showRegister={showRegister}
        setShowRegister={setShowRegister}
        setUserData={setUser}
      />
    );
  }
  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
      <Route path = "/" element = {<DashboardPage user = {user} setUser={setUser}/>}/>
        <Route path = "/dashboard" element = {<DashboardPage user = {user} setUser={setUser}/>}/>
        <Route path="/transactions" element={<UserTransactionsPage user={user} />} />
        <Route path = "/users" element = {<UsersPage/>}/>
        <Route path = "/budgets" element = {<UserBudgetsPage user = {user}/>}/>
        <Route path = "/categories" element = {<CategoriesPage/>}/>
        <Route path = "/accounts" element = {<UserAccountsPage user = {user}/>}/>
        <Route path = "/reports" element = {<UserReportsPage user = {user}/>}/>
        <Route path = "/createTransaction" element = {<CreateTransactionPage user ={user}/>}/>
        <Route path = "/createBudget" element = {<CreateBudgetPage user = {user}/>}/>
        <Route path = "/createAccount" element = {<CreateAccountPage user={user}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
