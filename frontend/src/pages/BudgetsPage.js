import React, { useEffect, useState } from "react";
import { fetchBudgets, deleteBudget} from "../services/api";

const BudgetsPage = () => {
        const[budgets, setBudgets] = useState([]);

        useEffect(() => {
            fetchBudgets().then((data) => {
                console.log("Budgets: ", data);
                setBudgets(data);
            }).catch((err) => console.error(err));
        }, []);

        const handleDelete = async(id) => {
            try{
                await deleteBudget(id);
                setBudgets(budgets.filter((budget) => budget.id !== id));
            }catch(error){
                console.error("A aparut o eroare:", error);
            }
        }

        return(
            <div>
                <h1>Budgets</h1>
                {budgets.length === 0 ? (
                    <p>No budgets or budgets are loading..</p>
                ) : (
                    <ul>
                        {budgets.map((tx) => (
                            <li key = {tx.id}> {tx.budgetName} - {tx.amount} - {tx.start_date} - {tx.end_date} - {tx.category_id}
                            <button onClick = {() => handleDelete(tx.id) }>Delete Budget</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        )
    };

export default BudgetsPage;