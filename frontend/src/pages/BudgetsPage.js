import React, { useEffect, useState } from "react";
import { fetchBudgets } from "../services/api";

const BudgetsPage = () => {
        const[budgets, setBudgets] = useState([]);

        useEffect(() => {
            fetchBudgets().then((data) => {
                console.log("Budgets: ", data);
                setBudgets(data);
            }).catch((err) => console.error(err));
        }, []);

        return(
            <div>
                <h1>Budgets</h1>
                {budgets.length === 0 ? (
                    <p>No budgets or budgets are loading..</p>
                ) : (
                    <ul>
                        {budgets.map((tx) => (
                            <li key = {tx.id}> {tx.budgetName} - {tx.amount} - {tx.start_date} - {tx.end_date} - {tx.category_id}</li>
                        ))}
                    </ul>
                )}
            </div>
        )
    };

export default BudgetsPage;