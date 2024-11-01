import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { Link } from "react-router-dom";
import { isAuthenticated, logoutUser } from "../../Common/Services/AuthService"; // Ensure you import logoutUser as well
import HeaderAuthLink from "./HeaderAuthLink"; // Import your HeaderAuthLink component
import { useNavigate } from "react-router-dom";


// Navigation Section that appears on every page
const Header = () => {
    const navigate = useNavigate();
    const [logout, setLogout] = useState(false);

    // useEffect to logout the user
    useEffect(() => {
        if (logout) {
            logoutUser().then((result) => {
                // Reset the form element
                if (result === "success") {
                    console.log("Successfully Logged Out.");
                    navigate("/auth");
                } else {
                    console.log(result);
                }
            });
            setLogout(false);
        }
    }, [logout, navigate]);




    // Function to handle when logout button is pressed
    const logoutButtonHandler = (e) => {
        e.preventDefault();
        setLogout(true);
    };


    return (
        <div className="module">
            <nav className="headerBar">
                <Link className="navLink" to="/">Planner</Link>
                <Link className="navLink" to="/optimizer">Optimizer</Link>
                <Link className="navLink" to="/directions">Directions</Link>
                <HeaderAuthLink 
                    authorized={isAuthenticated()}
                    onLogoutPress={logoutButtonHandler}
                />
            </nav>
        </div>
    );
};

export default Header;
