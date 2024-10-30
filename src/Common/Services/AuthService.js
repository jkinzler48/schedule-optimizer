import Parse from "parse";

export const createUser = (newUser) => {
  const user = new Parse.User();

  user.set("username", newUser.email);
  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);
  user.set("password", newUser.password);
  user.set("email", newUser.email);

  console.log("User: ", user);

  return user
    .signUp()
    .then((newUserSaved) => {
      return newUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

export const loginUser = (userInfo) => {
  //const user = new Parse.User();
  return Parse.User.logIn(userInfo.username, userInfo.password)
    .then((result) => {
      return "success";
    })
    .catch((error) => {
      //console.log("Error: " + error.code + " " + error.message);
      return error.message;
    });
};
  
