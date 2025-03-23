import React, {useState} from "react";
import {createBudget} from  "../services/api";

const CreateBudgetPage = () =>{
    const[budgetData, setBudgetData] = useState({
        budgetName: "",
        amount: "",
        start_date: "",
        end_date: "",
        categoryId: "",
        userId: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const {name, value} = e.target;
        setBudgetData({...budgetData, [name]: value});
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const createdBudget = await createBudget(budgetData);
            setMessage("The budget has been succesfully created");
            setBudgetData({
                budgetName: "",
                amount: "",
                start_date:"",
                end_date: "",
                categoryId: "",
                userId: ""
            });
            console.log("Budget: ", createdBudget);
        }catch(err){
            setMessage("An error has occured while creating a new budget");
        }
    };
    return (
        <div>
            <h2>Create a budget</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>BudgetName </label>
                    <input 
                        type = "text"
                        name = "budgetName"
                        value = {budgetData.budgetName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Amount</label>
                    <input 
                        type = "number"
                        name = "amount"
                        value={budgetData.amount}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Start date</label>
                    <input 
                        type = "date"
                        name = "start_date"
                        value={budgetData.start_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>End date</label>
                    <input
                        type = "date"
                        name = "end_date"
                        value={budgetData.end_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>CategoryId</label>
                    <input
                        type = "text"
                        name = "categoryId"
                        value={budgetData.categoryId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>UserId</label>
                    <input
                        type = "text"
                        name = "userId"
                        value={budgetData.userId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type = "submit">Create a new budget</button>
            </form>
        </div>
    );
};

export default CreateBudgetPage;