import React, { useEffect, useState } from "react";
import Header from "../Header/Header.js";
import {  useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm.js";
import { isAuthenticated, createUser } from "../../Common/Services/AuthService.js";


//Register component that uses athentication methods from AuthService
const AuthRegister = () => {


    const navigate = useNavigate();

    // redirect already authenticated users back to home
    //prevents user from routing to auth if already logged in
    useEffect(() => {
        if (isAuthenticated()) {
            navigate("/");
        }
    }, [navigate]);


  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // flag is the state to watch for add/remove updates
  const [add, setAdd] = useState(false);
  const [status, setStatus] = useState("");

 
  useEffect(() => {
    if (newUser && add) {

      //checks if password and confirm password fields match before attempting to create user
      if (newUser.password !== newUser.confirmPassword) {
        setStatus("Error: Passwords do not match.")
        setNewUser({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          password: "",
          confirmPassword: "",
        })
      } else {

        //attempts to create a new user
        createUser(newUser).then((userCreated) => {

          //if successful, redirect to Planner page
          if (userCreated) {
            setStatus("User Successfully Created");
            navigate("/")
          }
          setNewUser({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          })
        })
        .catch((error) => {
          setStatus("Error: " + error.message);
          setNewUser({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            password: "",
            confirmPassword: "",
          })
        });
      }
      setAdd(false);
    }
  }, [newUser, add, navigate]);

  //handle changes to text input fields
  const onChangeHandler = (e) => {
    e.preventDefault();
    // console.log(e.target);
    const { name, value: newValue } = e.target;
    // console.log(newValue);
    setNewUser({ ...newUser, [name]: newValue });
  };

  //handles when submit button is pressed
  const onSubmitHandler = (e) => {
    e.preventDefault();
    //console.log("submitted: ", e.target);
    setAdd(true);
  };

  return (
      <>
        <Header />
        <AuthForm
          user={newUser}
          isLogin={false}
          onChange={onChangeHandler}
          onSubmit={onSubmitHandler}
          status={status}
        />
      </>
  );
};

export default AuthRegister;
