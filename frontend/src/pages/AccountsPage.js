import React, { useEffect, useState } from "react";
import { fetchAccounts } from "../services/api";

const AccountsPage = () => {
    const [accounts, setAccounts] = useState([]);

    useEffect (() => {
        fetchAccounts().then((data) =>{
            console.log("Accounts: ", data);
            setAccounts(data);
        }).catch((err) => console.error(err));
    },[]);

    return(
        <div>
            <h1>Accounts</h1>
            {accounts.length === 0 ? (
                <p>There are no accounts or the accounts are loading..</p>
            ) : (
                <ul>
                    {accounts.map((tx)=> (
                        <li key = {tx.id}> {tx.name} - {tx.balance} - {tx.currency}</li>
                    ))};
                </ul>
            )}
        </div>
    )
};

export default AccountsPage;