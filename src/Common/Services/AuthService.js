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
      throw error;
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
  
//returns true is user is authenticated, and returns false if user is not authenticated
export const isAuthenticated = () => {
  if (Parse.User.current() && Parse.User.current().authenticated()) {
    return true;
  } else {
    return false;
  }
};


//logs out the current user
export const logoutUser = () => {
  return Parse.User.logOut()
    .then((result) => {
      return "success";
    })
    .catch((error) => {
      //console.log("Error: " + error.code + " " + error.message);
      return error.message;
    });
};
