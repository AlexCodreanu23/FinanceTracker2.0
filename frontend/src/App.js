import React from "react";
import TransactionsPage from "./pages/TransactionsPage";
import UsersPage from "./pages/UsersPage";
import BudgetsPage from "./pages/BudgetsPage";
import CategoriesPage from "./pages/CategoriesPage";
import AccountsPage from "./pages/AccountsPage";
import ReportsPage from "./pages/ReportsPage";
import CreateTransactionPage from "./pages/CreateTransactionPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import './App.css';
import CreateBudgetPage from "./pages/CreateBudgetPage";

function App() {
  return (
    <div>
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
