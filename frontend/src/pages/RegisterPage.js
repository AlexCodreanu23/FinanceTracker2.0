import React, { useState } from "react";
import { registerUser } from "../services/api";

const RegisterPage = ({ setUserData }) => {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirst]   = useState("");
  const [lastName, setLast]     = useState("");
  const [error, setError]       = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(email, password, firstName, lastName);
      localStorage.setItem("token", data.token);
      setUserData({
        id:        data.userId,
        firstName: data.firstName,
        lastName:  data.lastName
      });
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div style={{ margin: "50px auto", maxWidth: "400px", textAlign: "center" }}>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>First Name:</label><br/>
          <input
            type="text"
            value={firstName}
            onChange={e => setFirst(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Last Name:</label><br/>
          <input
            type="text"
            value={lastName}
            onChange={e => setLast(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label><br/>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Password:</label><br/>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button type="submit" style={{ padding: "8px 16px" }}>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
