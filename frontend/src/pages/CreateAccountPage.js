import React, {useState} from "react";
import { createAccount} from "../services/api";
import { useNavigate } from "react-router-dom";
import "../components/CreateAccountPage.css";

export default function CreateAccountPage({user}) {
    const [accountData, setAccountData] = useState({
        name: "",
        balance: "",
        currency: "",
        accountType: ""
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setAccountData(data => ({...data, [name]: value}));
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            await createAccount({
                ...accountData,
                userId: user.id
            });
            setMessage("An account has been created succesfully");
            setTimeout(() => navigate("/accounts"),1000);
        }catch(error){
            setMessage("An error has occured while creating an account!");
        }
    };
    return(
        <div className="create-account-page">
            <h2 className="title">Create a new account</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit} className="form">
                    <label>Name:</label>
                    <input
                        type = "text"
                        name = "name"
                        value={accountData.name}
                        onChange={handleChange}
                        required
                    />
                    <label>Balance</label>
                    <input
                        type = "number"
                        name = "balance"
                        value={accountData.balance}
                        onChange={handleChange}
                        required
                    />
                    <label>Currency:</label>
                    <select
                    name="currency"
                    value={accountData.currency}
                    onChange={handleChange}
                    required
                    >
                    <option value="USD">US Dollar (USD)</option>
                    </select>
                    <label>Account Type:</label>
                    <select
                        name="accountType"
                        value={accountData.accountType}
                        onChange={handleChange}
                        required
                    >
                    <option value="" disabled>— Select type —</option>
                    <option value="asset">Asset</option>
                    <option value="liability">Liability</option>
                    </select>
                <button type = "submit" className="btn-submit">Create an account</button>
            </form>
        </div>
    );
};