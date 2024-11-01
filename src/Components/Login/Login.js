import React, { useEffect, useState } from "react";
import { loginUser } from "../../Common/Services/AuthService.js"
import Header from "../Header/Header.js";
import LoginForm from "./LoginForm";

const AuthLogin = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  // flag is the state to watch for add/remove updates
  const [login, setLogin] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (userInfo && login) {
      loginUser(userInfo).then((result) => {// Reset the form element
        if (result === "success") {
            //alert(` you successfully logged in!`);
            setUserInfo({
                username: "",
                password: "",
                });
            setStatus("Logged in sucessfully")
        } else {
            setUserInfo({
                username: userInfo.username,
                password: "",
                });
            setStatus(result)
        }
      })
      setLogin(false);
    }
  }, [userInfo, login]);
  

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value: newValue } = e.target;
    setUserInfo({ ...userInfo, [name]: newValue });
  };

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