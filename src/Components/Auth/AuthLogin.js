import React, { useEffect, useState } from "react";
import { loginUser } from "../../Common/Services/AuthService.js"
import Header from "../Header/Header.js";
import AuthForm from "./AuthForm.js";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../Common/Services/AuthService.js";

const AuthLogin = () => {

    const navigate = useNavigate();

    // redirect already authenticated users back to home
    //prevents user from routing to auth if already logged in
    useEffect(() => {
        if (isAuthenticated()) {
            navigate("/");
        }
    }, [navigate]);

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  // flag is the state to watch for add/remove updates
  const [login, setLogin] = useState(false);
  const [status, setStatus] = useState("");



  useEffect(() => {
    if (userInfo && login) {
      loginUser(userInfo).then((result) => {
        if (result === "success") {
            //alert(` you successfully logged in!`);
            // Reset the form element
            setUserInfo({
                email: "",
                password: "",
                });
            setStatus("Logged in sucessfully")
            navigate("/")
        } else {
            //reset password but keep the email if the login was unsuccessful
            setUserInfo({
                email: userInfo.email,
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
        <AuthForm
          user={userInfo}
          isLogin={true}
          onChange={onChangeHandler}
          onSubmit={onSubmitHandler}
          status={status}
        />
      </>
  );
};

export default AuthLogin;