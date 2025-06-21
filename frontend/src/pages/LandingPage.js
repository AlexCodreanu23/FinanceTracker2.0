import React from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import "../components/LandingPage.css";

export default function LandingPage({ showRegister, setShowRegister, setUserData }) {
  return (
    <div className="landing-container">
      <div className="landing-card">
        <h1 className="landing-title">FinanceTracker 2.0</h1>
        <p className="landing-tagline">
          Keep track of your expenses and plan your budget like a pro.
        </p>

        {showRegister ? (
          <RegisterPage setUserData={setUserData} />
        ) : (
          <LoginPage setUserData={setUserData} />
        )}

        <div className="landing-toggle">
          {showRegister ? (
            <>
              Already have an account?{" "}
              <button onClick={() => setShowRegister(false)}>Log In</button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button onClick={() => setShowRegister(true)}>Register</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
