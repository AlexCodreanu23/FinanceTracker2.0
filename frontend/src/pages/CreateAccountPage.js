import React, {useState} from "react";
import { createAccount} from "../services/api";

const CreateAccountPage = () => {
    const [accountData, setAccountData] = useState({
        name: "",
        balance: "",
        currency: "",
        userId: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setAccountData({...accountData, [name]: value});
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const createdAccount = await createAccount(accountData);
            setMessage("An account has been created succesfully");
            setAccountData({
                name: "",
                balance: "",
                currency: "",
                userId: ""
            });
            console.log("Account: ", createdAccount);
        }catch(error){
            setMessage("An error has occured while creating an account!");
        }
    };
    return(
        <div>
            <h2>Create a new account</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type = "text"
                        name = "name"
                        value={accountData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Balance</label>
                    <input
                        type = "number"
                        name = "balance"
                        value={accountData.balance}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Currency</label>
                    <input
                    type = "text"
                    name = "currency"
                    value = {accountData.currency}
                    onChange = {handleChange}
                    required 
                    />
                </div>
                <div>
                    <label>UserId</label>
                    <input
                        type = "text"
                        name = "userId"
                        value = {accountData.userId}
                        onChange = {handleChange}
                        required
                    />
                </div>
                <button type = "submit">Create an account</button>
            </form>
        </div>
    );
};

export default CreateAccountPage;