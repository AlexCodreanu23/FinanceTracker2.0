import React, {useEffect, useState} from "react";
import {createBudget, fetchCategories} from  "../services/api";
import { useNavigate } from "react-router-dom";
import "../components/CreateBudgetPage.css";

export default function CreateBudgetPage({user}) {
    const[budgetData, setBudgetData] = useState({
        budgetName: "",
        amount: "",
        start_date: "",
        end_date: "",
        categoryId: ""
    });
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const today = new Date().toISOString().split("T")[0];

    useEffect(()=> {
        fetchCategories(user.id).then(setCategories);
    },[user.id]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setBudgetData(data => ({...data, [name]: value}));
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setIsError(false);

        const {start_date, end_date} = budgetData;
        const s = new Date(start_date);
        const en = new Date(end_date);
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        if (s < now) {
            setIsError(true);
            return setMessage("Data de inceput nu poate fi inainte de azi.");
        }
        if (en < now) {
            setIsError(true);
            return setMessage("Data de sfarsit nu poate fi inainte de azi.");
        }
        if (en < s) {
            setIsError(true);
            return setMessage("Data de sfarsit trebuie sa fie dupa data de inceput.");
        }
        try{
            await createBudget({
                ...budgetData,
                userId: user.id
            });
            setIsError(false);
            setMessage("The budget has been succesfully created");
            setTimeout(()=> navigate("/budgets"),1000);
        }catch(err){
            setIsError(true);
            setMessage("An error has occured while creating a new budget");
        }
    };
    return (
        <div className="create-budget-page">
            <h2 className="title">Add a new budget</h2>
            {message && (
                <p className={isError ? "message error" : "message success"}>
                    {message}
                </p>
            )}
            <form onSubmit={handleSubmit} className="form">
                    <label>BudgetName </label>
                    <input 
                        type = "text"
                        name = "budgetName"
                        value = {budgetData.budgetName}
                        onChange={handleChange}
                        required
                    />
                    <label>Amount</label>
                    <input 
                        type = "number"
                        name = "amount"
                        value={budgetData.amount}
                        onChange={handleChange}
                        required
                    />
                    <label>Start date</label>
                    <input 
                        type = "date"
                        name = "start_date"
                        value={budgetData.start_date}
                        onChange={handleChange}
                        required
                        min = {today}
                    />
                    <label>End date</label>
                    <input
                        type = "date"
                        name = "end_date"
                        value={budgetData.end_date}
                        onChange={handleChange}
                        required
                        min = {today}
                    />
                    <label>
                    Category
                    <select
                        name="categoryId"
                        value={budgetData.categoryId}
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
                <button type = "submit" className="btn-submit">Create a new budget</button>
            </form>
        </div>
    );
};