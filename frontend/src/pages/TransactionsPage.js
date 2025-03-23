import React, { useEffect, useState } from "react";
import { fetchTransactions, deleteTransaction} from "../services/api";

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);
  
    useEffect(() => {
      fetchTransactions()
        .then((data) => {
          console.log("Tranzacții:", data);
          setTransactions(data);
        })
        .catch((err) => console.error(err));
    }, []);

    const handleDelete = async(id) => {
      try{
        await deleteTransaction(id);
        setTransactions(transactions.filter((transaction) => transaction.id !== id));
      }catch(error){
        console.error("A aparut o eroare: ", error);
      }
    }
  
    return (
      <div>
        <h1>Transactions</h1>
        {transactions.length === 0 ? (
          <p>No transactions or the transactions are loading...</p>
        ) : (
          <ul>
            {transactions.map((tx) => (
              <li key={tx.id}>
                {tx.amount} - {tx.accountId} - {tx.categoryId} - {tx.userId} - {tx.date}
                <button onClick={() => handleDelete(tx.id)}>Delete Transaction</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default TransactionsPage;