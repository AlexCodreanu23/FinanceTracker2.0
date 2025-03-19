import React, { useEffect, useState } from "react";
import { fetchUsers } from "../services/api";

const UsersPage = () => {
    const[users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers().
        then((data) => {
            console.log("Useri: ", data);
            setUsers(data);
        }) 
        .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <h1>Users</h1>
            {users.length === 0? (
                <p>No Users or the users are loading..</p>
            ) : (
                <ul>
                    {users.map((tx) => (
                        <li key = {tx.id}> {tx.firstName} - {tx.lastName} - {tx.email} </li>
                    ))}
                </ul>
            )};
        </div>
    )
};

export default UsersPage;
