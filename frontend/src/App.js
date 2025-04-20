import React, { useState, useEffect } from "react";
import UsersPage from "./pages/UsersPage";
import CategoriesPage from "./pages/CategoriesPage";
import CreateTransactionPage from "./pages/CreateTransactionPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import CreateBudgetPage from "./pages/CreateBudgetPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import UserTransactionsPage from "./pages/UserTransactionsPage";
import UserAccountsPage from "./pages/UserAccountsPage";
import UserBudgetsPage from "./pages/UserBudgetsPage";
import UserReportsPage from "./pages/UserReportsPage"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
    return showRegister? (
      <>
        <RegisterPage setUserData={setUser}/>
        <p style = {{textAlign: "center"}}>
            Already have an account?{""}
            <button onClick={()=> setShowRegister(false)}>Login</button>
        </p>
      </>
    ) : (
        <>
        <LoginPage setUserData = {setUser}/>
        <p style = {{textAllign: "center"}}>
          Don't have an account?{""}
          <button onClick= {()=> setShowRegister(true)}>Register</button>
        </p>
      </>
    );
  } 
  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
      <Route path = "/" element = {<DashboardPage/>}/>
        <Route path = "/dashboard" element = {<DashboardPage/>}/>
        <Route path="/transactions" element={<UserTransactionsPage user={user} />} />
        <Route path = "/users" element = {<UsersPage/>}/>
        <Route path = "/budgets" element = {<UserBudgetsPage user = {user}/>}/>
        <Route path = "/categories" element = {<CategoriesPage/>}/>
        <Route path = "/accounts" element = {<UserAccountsPage user = {user}/>}/>
        <Route path = "/reports" element = {<UserReportsPage user = {user}/>}/>
        <Route path = "/createTransaction" element = {<CreateTransactionPage/>}/>
        <Route path = "/createBudget" element = {<CreateBudgetPage/>}/>
        <Route path = "/createAccount" element = {<CreateAccountPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
