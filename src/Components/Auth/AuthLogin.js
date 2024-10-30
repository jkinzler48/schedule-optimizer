import React, { useEffect, useState } from "react";
import { loginUser } from "../../Common/Services/AuthService.js"
import LoginForm from "./LoginForm";

const AuthLogin = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  // flag is the state to watch for add/remove updates
  const [login, setLogin] = useState(false);

  useEffect(() => {
    if (userInfo && login) {
      loginUser(userInfo)
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
    console.log("submitted: ", e.target);
    setLogin(true);
  };

  return (
      <LoginForm
        user={userInfo}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
      />
  );
};

export default AuthLogin;