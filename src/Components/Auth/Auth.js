import React from "react";
import { Link } from "react-router-dom";

const AuthModule = () => {
  return (
    <div>
      <Link to="/register">
        <button>Register</button>
      </Link>
      <br />
      <br />
      <Link to="/login">
        <button>Login</button>
      </Link>
    </div>
  );
};

export default AuthModule;
