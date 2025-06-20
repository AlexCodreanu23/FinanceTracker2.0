import React, { useEffect, useState } from "react";
import { createTransaction, updateAccountBalance, fetchUserAccounts, fetchCategories } from "../services/api";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserAccounts(user.id).then(setAccounts);
    fetchCategories(user.id).then(setCategories);
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
      await createTransaction({
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

      setMessage("Tranzacția a fost creată cu succes!");
      setTimeout(() => navigate("/transactions"), 1000);
    } catch (error) {
      console.error(error);
      setMessage("A apărut o eroare la creare tranzacție!");
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
