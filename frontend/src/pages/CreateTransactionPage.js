import React, { useState } from "react";
import { createTransaction } from "../services/api";

const CreateTransactionPage = () => {
  const [transactionData, setTransactionData] = useState({
    amount: "",
    accountId: "",
    categoryId: "",
    userId: "",
    type: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransactionData({ ...transactionData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTransaction(transactionData);
      setMessage("The transaction has been created successfully!");
      setTransactionData({
        amount: "",
        accountId: "",
        categoryId: "",
        userId: "",
        type: ""
      });
    } catch (error) {
      setMessage("An error occurred while creating the transaction!");
    }
  };

  return (
    <div>
      <h2>Create a Transaction</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Suma:</label>
          <input
            type="number"
            name="amount"
            value={transactionData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>ID Cont:</label>
          <input
            type="text"
            name="accountId"
            value={transactionData.accountId}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>ID Categorie:</label>
          <input
            type="text"
            name="categoryId"
            value={transactionData.categoryId}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>ID User:</label>
          <input
            type="text"
            name="userId"
            value={transactionData.userId}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Type:</label>
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
        </div>

        <button type="submit">Create a Transaction</button>
      </form>
    </div>
  );
};

export default CreateTransactionPage;
