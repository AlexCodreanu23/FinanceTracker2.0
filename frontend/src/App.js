import React, { useState, useEffect } from "react";
import TransactionsPage from "./pages/TransactionsPage";
import UsersPage from "./pages/UsersPage";
import BudgetsPage from "./pages/BudgetsPage";
import CategoriesPage from "./pages/CategoriesPage";
import AccountsPage from "./pages/AccountsPage";
import ReportsPage from "./pages/ReportsPage";
import CreateTransactionPage from "./pages/CreateTransactionPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import CreateBudgetPage from "./pages/CreateBudgetPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import RegisterPage from "./pages/RegisterPage";
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
    <div>
      <Header user={user} />
      <TransactionsPage />
      <UsersPage />
      <BudgetsPage />
      <CategoriesPage />
      <AccountsPage/>
      <ReportsPage/>
      <CreateTransactionPage/>
      <CreateAccountPage/>
      <CreateBudgetPage/>
    </div>
  );
}

export default App;
