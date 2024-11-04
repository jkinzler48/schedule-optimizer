import React from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ user, onChange, onSubmit, status }) => {
  return (
    <>
      <div className = "module">
        {/* displays status message if one exists */}
        {status && <div style={{color:'red'}}>{status}</div>}
        <form onSubmit={onSubmit}>
          <div>
            <label>Username (Email)</label>
            <br />
            <input
              type="email"
              value={user.username}
              onChange={onChange}
              name="username"
              placeholder="Your Username"
              required
            />
            <br />
            <br />
            <label>Password</label>
            <br />
            <input
              type="password"
              value={user.password}
              onChange={onChange}
              name="password"
              placeholder="Your Password"
              required
            />
            <br />
            <br />
            <button type="submit" onSubmit={onSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Link to Register page */}
      <div className="module">
          <p>Don't Have an Account?</p>
          <Link to="/register">
              <button>Register</button>
          </Link>
      </div>
    </>
  );
};

export default LoginForm;
