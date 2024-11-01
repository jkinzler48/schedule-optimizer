import React from "react";
import { Link, Navigate } from "react-router-dom";
import Header from "../Header/Header";
import { isAuthenticated } from "../../Common/Services/AuthService";

export const Auth = () => {
    // Check if the user is authenticated
    if (isAuthenticated()) {
        return <Navigate to="/" replace />; // Redirect to home if authenticated
    }

    return (
        <>
            <Header />
            <h1>Authorization</h1>
            <div className="module">
                <h3>Login/Register to access "Planner" and "Optimizer" pages</h3>
                <div className="authButtons">
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                    <br />
                    <br />
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Auth;
