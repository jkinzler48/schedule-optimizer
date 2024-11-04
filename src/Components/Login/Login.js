import React, { useEffect, useState } from "react";
import { loginUser } from "../../Common/Services/AuthService.js"
import Header from "../Header/Header.js";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";

const AuthLogin = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  // flag is the state to watch for add/remove updates
  const [login, setLogin] = useState(false);
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && login) {
      loginUser(userInfo).then((result) => {
        if (result === "success") {
            //alert(` you successfully logged in!`);
            // Reset the form element
            setUserInfo({
                username: "",
                password: "",
                });
            setStatus("Logged in sucessfully")
            navigate("/")
        } else {
            //reset password but keep the username if the login was unsuccessful
            setUserInfo({
                username: userInfo.username,
                password: "",
                });
            setStatus(result)
        }
      })
      setLogin(false);
    }
  }, [userInfo, login, navigate]);
  
  //handles change to text input
  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value: newValue } = e.target;
    setUserInfo({ ...userInfo, [name]: newValue });
  };

  //handles submit button being pressed
  const onSubmitHandler = (e) => {
    e.preventDefault();
    setLogin(true);
  };


  return (
      <>
        <Header />
        <LoginForm
          user={userInfo}
          onChange={onChangeHandler}
          onSubmit={onSubmitHandler}
          status={status}
        />
      </>
  );
};

export default AuthLogin;