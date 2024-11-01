import React from "react";
import { isAuthenticated, logoutUser }from "../../Common/Services/AuthService.js"
import { useState, useEffect } from "react";
import HomeAuth from "./HomeAuth"

const Home = () => {

    const [logout, setLogout] = useState(false);
    const [status, setStatus] = useState("");

    //use effect to logout the user
    useEffect(() => {
        if (logout) {
        logoutUser().then((result) => {// Reset the form element
            if (result === "success") {
                setStatus("Sucessfully Logged Out.")
            } else {
                setStatus(result)
            }
        })
        setLogout(false);
        }
    }, [logout]);


    //function to handle when logout button is pressed
    const logoutButtonHandler = (e) => {
        e.preventDefault();
        setLogout(true);
    }
  
    return (
        <>
            <h1>Home</h1>
            <HomeAuth 
                authorized={isAuthenticated()}
                onLogoutPress={logoutButtonHandler}
                status={status}
            />
        </>
    );
};

export default Home;