import React, { useEffect, useState } from "react";
import { createTransaction, updateAccountBalance, fetchUserAccounts, fetchCategories, fetchUserBudgets } from "../services/api";
import { useNavigate } from "react-router-dom";
import {toast } from 'react-toastify';
import "../components/CreateTransactionPage.css";

export default function CreateTransactionPage ({user}) {
  const [transactionData, setTransactionData] = useState({
    amount: "",
    accountId: "",
    categoryId: "",
    type: ""
  });
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([])
  const [message, setMessage] = useState("");
  const [budgets, setBudgets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserAccounts(user.id).then(setAccounts).catch(console.error);
    fetchCategories(user.id).then(setCategories).catch(console.error);
    fetchUserBudgets(user.id).then(setBudgets).catch(console.error);
  }, [user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionData(data => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const account = accounts.find((a) => a.id === transactionData.accountId);
    const amount = parseFloat(transactionData.amount);
    if (transactionData.type === "expense" && amount > account.balance) {
      setMessage("Fonduri insuficiente în cont!");
      return;
    }

    try {
      const newTx = await createTransaction({
        ...transactionData,
        userId: user.id
      });

      const newBalance =
        transactionData.type === "income"
          ? account.balance + amount
          : account.balance - amount;

      await updateAccountBalance(account.id, { name: account.name, balance: newBalance, currency: account.currency, accountType: account.accountType});
      setAccounts((prev) =>
        prev.map((a) =>
          a.id === account.id ? { ...a, balance: newBalance } : a
        )
      );

      if (transactionData.type === "expense") {
        const txDate = new Date(newTx.date);
        const allCat = categories.find((c) =>
          c.name.toLowerCase() === "all"
        );
        const allCatId = allCat?.id;

        const active = budgets
          .filter((bd) => {
            const start = new Date(bd.start_date);
            const end   = new Date(bd.end_date);
            const inPeriod = txDate >= start && txDate <= end;
            if (bd.categoryId === allCatId) return inPeriod;
            return inPeriod && bd.categoryId === newTx.categoryId;
          })
          .sort(
            (a, b) => new Date(b.start_date) - new Date(a.start_date)
          );

        if (active.length > 0) {
          const b = active[0];
          toast.info(
            `You spent $${amount.toFixed(2)} from your "${b.budgetName}" budget`,
            { autoClose: 6000 }
          );
        } else {
          toast.info(
            "This expense did not match any active budget.",
            { autoClose: 6000 }
          );
        }

      setMessage("The transaction has been succesfully created!");
      setTimeout(() => navigate("/transactions"), 1000);
      }else {
        toast.success(
          `You received $${amount.toFixed(2)} into your "${account.name}" account`,
          { autoClose: 4000 }
        );
      }
      setMessage("The transaction has been successfully created!");
      setTimeout(() => navigate("/transactions"), 1000);
    }catch (error) {
      console.error(error);
      setMessage("An error occured!");
    }
  };

  return (
    <div className="create-transaction-page">
      <h2 className="title">Add Transaction</h2>
      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit} className="form">
        <label>
          Amount
          <input
            type="number"
            name="amount"
            value={transactionData.amount}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Account
          <select
            name="accountId"
            value={transactionData.accountId}
            onChange={handleChange}
            required
          >
            <option value="" disabled>— Select account —</option>
            {accounts.map(a => (
              <option key={a.id} value={a.id}>
                {a.name} ({a.balance})
              </option>
            ))}
          </select>
        </label>

        <label>
          Category
          <select
            name="categoryId"
            value={transactionData.categoryId}
            onChange={handleChange}
            required
          >
            <option value="" disabled>— Select category —</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Type
          <select
            name="type"
            value={transactionData.type}
            onChange={handleChange}
            required
          >
            <option value="" disabled>— Select type —</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>

        <button type="submit" className="btn-submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
};
