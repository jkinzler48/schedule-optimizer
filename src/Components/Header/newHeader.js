import React, { useState, useEffect } from "react"; // Import useState and useEffect
import { Link } from "react-router-dom";
import { isAuthenticated, logoutUser } from "../../Common/Services/AuthService"; // Ensure you import logoutUser as well
import HeaderAuthLink from "./HeaderAuthLink"; // Import your HeaderAuthLink component
import { useNavigate } from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Photos
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    );
};

export default Header;
