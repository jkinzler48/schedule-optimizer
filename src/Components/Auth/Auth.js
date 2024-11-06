import React, {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import { isAuthenticated } from "../../Common/Services/AuthService";


//Outer Authorization module that has links to login and register pages
export const Auth = () => {

    const navigate = useNavigate();

    // redirect already authenticated users back to home
    //prevents user from routing to auth if already logged in
    useEffect(() => {
        if (isAuthenticated()) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <>
            <Header />
            <h1>Authorization</h1>
            <div className="module">
                <h3>Login/Register to access "Planner" and "Optimizer" pages</h3>
                <div className="authButtons">
                    <Link to="/auth/register">
                        <button>Register</button>
                    </Link>
                    <br />
                    <br />
                    <Link to="/auth/login">
                        <button>Login</button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Auth;
