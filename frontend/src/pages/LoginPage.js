import React, { useState } from "react";
import { loginUser } from "../services/api";


const LoginPage = ({setUserData}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const data = await loginUser(email, password);
            localStorage.setItem("token", data.token);

            localStorage.setItem("user", JSON.stringify({
                id:        data.userId,
                firstName: data.firstName,
                lastName:  data.lastName
              }));

            setUserData({
                id: data.userId,
                firstName: data.firstName,
                lastName: data.lastName
            });
        }catch(err){
            setError("Login failed. Please check your credentials");
            console.error(err);
        }
    }

    return (
        <div style={{ margin: "50px auto", maxWidth: "400px", textAlign: "center" }}>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit = {handleSubmit}>
                <div style = {{marginBottom: "10px"}}>
                    <label>Email:</label>
                    <br/>
                    <input 
                        type = "email"
                        value = {email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                <div style = {{marginBottom: "10px"}}>
                    <label>Password:</label>
                    <br/>
                    <input
                        type = "password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{width:"100%", padding:"8px"}}
                    />
                </div>
                <button type = "submit" style = {{padding: "8px 16px"}}>Login</button>
            </form>
        </div>
    );
};

export default LoginPage;