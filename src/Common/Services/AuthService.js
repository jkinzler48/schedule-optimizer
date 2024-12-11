import Parse from "parse";


//Parse Service with authentication methods

//creates a new _User object in the Parse database
export const createUser = (newUser) => {
  const user = new Parse.User();

  user.set("username", newUser.email);
  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);
  user.set("password", newUser.password);
  user.set("email", newUser.email);

  return user
    .signUp()
    .then((newUserSaved) => {
      return newUserSaved;
    })
    .catch((error) => {
      throw error;
    });
};


//Attempts to login user
export const loginUser = (userInfo) => {
  //const user = new Parse.User();
  return Parse.User.logIn(userInfo.email, userInfo.password)
    .then((result) => {
      return "success";
    })
    .catch((error) => {
      return error.message;
    });
};
  
//returns true is user is authenticated, and returns false if user is not authenticated
export const isAuthenticated = () => {
  return Parse.User.current()?.authenticated;
};


//logs out the current user
export const logoutUser = () => {
  return Parse.User.logOut()
    .then((result) => {
      return "success";
    })
    .catch((error) => {
      return error.message;
    });
};
