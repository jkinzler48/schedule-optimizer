import React, { useEffect, useState } from "react";
import { createUser } from "../../Common/Services/AuthService.js"
import RegisterForm from "./RegisterForm";

const AuthRegister = () => {
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

      } else {

        createUser(newUser).then((userCreated) => {
          if (userCreated) {
            alert(
              `${userCreated.get("firstName")}, you successfully registered!`
            );
            setStatus("User Successfully Created");
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
          setAdd(false);
        });
      }
      setAdd(false);
    }
  }, [newUser, add]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    // console.log(e.target);
    const { name, value: newValue } = e.target;
    // console.log(newValue);
    setNewUser({ ...newUser, [name]: newValue });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("submitted: ", e.target);
    setAdd(true);
  };

  return (
      <RegisterForm
        user={newUser}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
        status={status}
      />
  );
};

export default AuthRegister;
